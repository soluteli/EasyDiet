import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';

export default function extractDish(markdownFilePath) {
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');

  // Define the function to extract data
  const extractData = node => {
    const data = {
      level: null,
      desc: null,
    };

    let currentHeading1 = null;
    let currentHeading2 = null;
    let currentDesc = null;
    let currentLevel = null;
    let heading2Items = {};

    const visit = node => {
      if (node.type === 'heading' && node.depth === 1) {
        if (currentHeading1) {
          if (currentDesc) {
            data.desc = currentDesc;
          }
          if (currentLevel) {
            data.level = currentLevel;
          }
        }
        currentHeading1 = node.children.map(child => child.value).join('');
        currentDesc = null;
        currentLevel = null;
        heading2Items = {};
      } else if (node.type === 'heading' && node.depth === 2) {
        currentHeading2 = node.children.map(child => child.value).join('');
        heading2Items[currentHeading2] = [];
      } else if (node.type === 'paragraph' && node.children) {
        const textContent = node.children
          .filter(child => child.type === 'text')
          .map(text => text.value)
          .join('');
        if (textContent.includes('烹饪难度')) {
          const levelMatch = textContent.match(/★+/);
          if (levelMatch) {
            currentLevel = levelMatch[0];
          }
        } else {
          currentDesc = textContent;
        }
      } else if (node.type === 'list' && currentHeading2) {
        const listItems = node.children
          .filter(child => child.type === 'listItem')
          .map(listItem => {
            const itemText = listItem.children
              .filter(child => child.type === 'paragraph')
              .map(paragraph =>
                paragraph.children.map(text => text.value).join(''),
              )
              .join('');
            return itemText;
          });

        if (currentHeading2) {
          heading2Items[currentHeading2] = listItems;
        }
      }
      if (node.children) {
        node.children.forEach(child => visit(child));
      }
    };

    visit(node);

    if (currentHeading1) {
      if (currentDesc) {
        data.desc = currentDesc;
      }
      if (currentLevel) {
        data.level = currentLevel;
      }
    }

    if (Object.keys(heading2Items).length > 0) {
      Object.assign(data, heading2Items);
    }

    return data;
  };

  // Parse the Markdown content and extract data
  const tree = unified().use(remarkParse).parse(markdownContent);

  const jsonData = extractData(tree);
  console.log(JSON.stringify(jsonData, null, 2));
}
