import { useEffect, useState } from "react";
const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://jsonplaceholder.typicode.com/posts1";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        alert("Error !!", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  //   if (loading) {
  //     return <p>로딩중 Loading...</p>;
  //   }
  const Loading = () => <img src={`spiner.gif`} alt="" style={{ width: "100px", heigth: "100px" }} />;
  return (
    <>
      <h1>8. 데이터 가져오기(Fetch)</h1>
      {loading && <Loading />}
      <ol>
        {data.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ol>
    </>
  );
};
export default FetchData;
