/**
 * Rehype plugin pro obsah projektů v Markdownu.
 *
 * 1) Placeholdery: inline kód začínající "TODO" (`TODO: popis`) se vykreslí
 *    jako nenápadné [doplnit] / [to be added]; popis zůstane v atributu title.
 * 2) Tabulky se zabalí do kontejneru s horizontálním scrollem, aby na mobilu
 *    nerozbily layout (kontejner je fokusovatelný kvůli ovládání klávesnicí).
 */

const LABELS = {
  cs: { todo: '[doplnit]', table: 'Tabulka' },
  en: { todo: '[to be added]', table: 'Table' },
};

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
}

export default function rehypePortfolio() {
  return (tree, file) => {
    const path = String(file?.path || file?.history?.[0] || '').replaceAll('\\', '/');
    const lang = /\/projects\/en\//.test(path) ? 'en' : 'cs';
    const l = LABELS[lang];

    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type !== 'element') return child;

        if (child.tagName === 'code' && node.tagName !== 'pre') {
          const text = textOf(child).trim();
          if (/^TODO\b/.test(text)) {
            return {
              type: 'element',
              tagName: 'span',
              properties: { className: ['todo'], title: text },
              children: [{ type: 'text', value: l.todo }],
            };
          }
        }

        walk(child);

        if (child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['table-wrap'],
              tabIndex: 0,
              role: 'region',
              ariaLabel: l.table,
            },
            children: [child],
          };
        }
        return child;
      });
    };

    walk(tree);
  };
}
