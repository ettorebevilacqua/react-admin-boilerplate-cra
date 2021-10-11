import React from 'react';
import styles from './style';

export default function BarTwoColumn({ tableProps, trProps, td1Props, td2Props, children }) {
  const childs = children || [];
  const child1 = children[0] || <span></span>;
  const child2 = children[1] || <span></span>;

  return (
    <table {...tableProps}>
      <tbody>
        <tr {...trProps}>
          <td {...td1Props} style={styles.fullCol}>
            {child1}
          </td>
          <td {...td2Props} style={styles.lastCol}>
            {child2}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
