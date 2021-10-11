import React from 'react';
import './style.css';

export default function BarTwoColumn({ tableProps, trProps, td1Props, td2Props, children }) {
  const childs = children || [];
  const child1 = children[0] || <span></span>;
  const child2 = children[1] || <span></span>;

  return (
    <table {...tableProps}>
      <tr {...trProps}>
        <td {...td1Props} class="fullCol">
          {child1}
        </td>
        <td {...td2Props} class="lastCol">
          {child2}
        </td>
      </tr>
    </table>
  );
}
