// src/components/Table/Table.jsx
import styles from './Button.module.css'

export default function Table({ data, columns, onRowClick, withCheckbox = false, actions = [] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {withCheckbox && <th></th>}
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {actions.length > 0 && <th>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className={styles.row} onClick={() => onRowClick?.(row)}>
            {withCheckbox && (
              <td>
                <input type="checkbox" />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
            {actions.length > 0 && (
              <td className={styles.actions}>
                {actions.map((action, index) => (
                  <button
                    key={index}
                    className={styles.button}
                    onClick={(e) => {
                      e.stopPropagation()
                      action.onClick(row)
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
