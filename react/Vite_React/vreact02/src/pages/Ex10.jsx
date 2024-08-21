import { useState } from "react";
import tableCss from "./Ex10.module.css";
import data from "./Ex10data";
const Table = () => {
  const [ea, setEa] = useState(Array(data.length).fill(0));
  return (
    <>
      <h1>10. 데이터 임포트 테이블화</h1>
      <div>{JSON.stringify(data)}</div>
      <div className={tableCss["data-box"]}>
        <table>
          <tbody>
            {data.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{v.product_name}</td>
                  <td>{v.price}</td>
                  <td>{v.category}</td>
                  <td>{v.delivery_price}</td>
                  <td>
                    <input type="number" min="0" value={0} />
                  </td>
                  <td>{v.price + v.delivery_price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Table;
