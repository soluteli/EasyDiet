import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';

export default function extractDishItem(markdownFilePath) {
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');

  // Define the function to extract data
  const extractData = node => {
    const data = {
      level: null,
      desc: null,
    };

    let currentHeading1 = null;
    let currentDesc = null;
    let currentLevel = null;

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
        } else if (!currentDesc) {
          currentDesc = textContent;
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
        data.level = currentLevel.length;
      }
    }

    return data;
  };

  // Parse the Markdown content and extract data
  const tree = unified().use(remarkParse).parse(markdownContent);

  const jsonData = extractData(tree);

  return jsonData;
}
