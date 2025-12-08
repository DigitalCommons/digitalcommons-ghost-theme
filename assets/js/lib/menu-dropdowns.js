// For Dropdown Menu

(function($) {
  "use strict";

  let opt = {
    subitemTag: "[subitem]",
    labelAttr: "data-menu-label",
    parentClass: "menu-item-has-children",
    childUlClass: "ghost-submenu",
    targetElement: "ul.nav li",
    dropdownIcon: "<svg xmlns='http://www.w3.org/2000/svg' width='11' height='7' fill='currentColor' class='bi bi-caret-down' viewBox='0 0 11 7'><path d='M5.4999 6.20003L0.649902 1.35003L1.3499 0.650024L5.4999 4.80002L9.6499 0.650024L10.3499 1.35003L5.4999 6.20003Z'/></svg>",
  };
  function stripSubitemLabel(text) {
    return text.replaceAll(`${opt.subitemTag}`, "").trim();
  }
  function ghost_dropdown() {
    let parent = undefined; // The menu item we hang subitems to, if any
    let subItems = undefined; // The list of subitems, if any
    
    $(opt.targetElement)
      .each((ix, elem) => {
        const node = $(elem);
        const text = node.text();
        node.css("display", "");
        if (text.indexOf(opt.subitemTag) >= 0) { // Is this marked a subitem?
          // console.log("subitem", node.prop('outerHTML'));
          // Yes, convert it to the correct form by removing subitemTag plus surrounding whitespace
          node.children().first()
              .text(stripSubitemLabel(text));
          // Apply this to the data-menu-label class too on node and sub-elements
          node.add(`[${opt.labelAttr}*="${opt.subitemTag}"]`)
              .attr(opt.labelAttr, (ix, text) => stripSubitemLabel(text));

          // To be a subitem, we need a parent.
          if (!parent) {
            // No parent means we must be the first item -
            // it doesn't make sense to have a subitem
            // first, so just leave it as is.
            // However, we have a new parent
            // console.log("no parent");
            parent = node;
            subItems = undefined;
          }
          else {
            // We have a parent, 
            // If there's no subItems, create one, if possible.
            if (!subItems) {
              // The parent needs to have the right class
              parent.addClass(opt.parentClass);
              // And an <ul> sublist with the right class
              subItems = $("<ul></ul>");
              subItems.addClass(opt.childUlClass);
              parent.append(subItems);
              // And an icon
              parent.append(opt.dropdownIcon);
            }
            // Should have a child list now. Append this node
            subItems.append(node);
            // console.log("create subItems",subItems.prop('outerHTML'));
          }
        }
        else {
          // Not a subitem. Therefore a parent.
          parent = node;
          subItems = undefined; // Create this lazily.
          // console.log("new parent", node.prop('outerHTML'));
        }
        
      });
  }
  $(document).ready(function() {
      ghost_dropdown();
  });
  
}(jQuery));
