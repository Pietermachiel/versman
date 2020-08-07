import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group flex justify-center">
      {items.map((item, id) => (
        <li
          onClick={() => onItemSelect(item)}
          key={id}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item.name || "Alles" }
        </li>
      ))}
    </ul>
  );
};

// ListGroup.defaultProps = {
//   textProperty: "name",
//   valueProperty: "_id"
// };

export default ListGroup;
