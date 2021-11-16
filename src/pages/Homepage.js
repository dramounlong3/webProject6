import React, { useState, useEffect } from "react";
import Picture from "../components/Picture";
import Search from "../components/Search";

const Homepage = () => {
  const photoNum = 16;
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [num, setNum] = useState(0); //額外增加的state, 使currentSearch沒有改變也應該要重複搜尋
  //避免input有打字, 但是沒按search, 結果load出來的頁面是跟打字有關的圖片
  const [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f91700001000001e44c45ef9f094d99af4370d3f1e9b3e1";
  const initialURL = `https://api.pexels.com/v1/curated?per_page=${photoNum}&page=1`;
  const searchURL = `https://api.pexels.com/v1/search?query=${
    /*input*/ currentSearch
  }&per_page=${photoNum}&page=1`;

  //fetch data from pexels API
  const search = async (url) => {
    //每次執行search(url)時, url(initialURL)的page值是寫死的1, 所以只要執行search(url), 一定都是秀第一頁
    //但一進來就要將page改為2, 雖然不會影響search(url), 但按load more button時, 才會從第二頁開始載入, 如果不設定就會在第一次按load more時, 就是原本的page=1, 第二次按才會變page=2
    setPage(2);
    // fetch已經內建於react module裡面
    // header根據API doc文件來決定需要給甚麼資料
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    //因為fetch的資料是json格式，需透過.json()來解析, 而且解析需要時間, 必須等
    let parseData = await dataFetch.json();

    setData(parseData.photos);
  };

  //load more picture
  async function morepicture() {
    //因為載入時, page至少都是要從第二頁開始, 所以在上面search設定search後, 都要把page改2
    //這裡也要在每一次按load more後, 將page+1, 也就是說page=2時載入photo後, 在state看已經變3了(但內容是第二頁的photo), 下一次再按load more, 就會從第3頁開始載入, 但state隨後立刻變4, 依此類推...
    //無論是initialURL還是searchURL, 都要將page=變數值, 才會一直換頁
    let newURL;
    if (/*input*/ currentSearch == "") {
      newURL = `https://api.pexels.com/v1/curated?per_page=${photoNum}&page=${page}`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${
        /*input*/ currentSearch
      }&per_page=${photoNum}&page=${page}`;
    }

    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    //因為fetch的資料是json格式，需透過.json()來解析, 而且解析需要時間, 必須等
    let parseData = await dataFetch.json();
    //讓原本的data array 接上新的photo array
    setData(data.concat(parseData.photos));
    setPage(page + 1);
    console.log("in load.");
  }

  //fetch data with initialURL when the page loads up
  // useEffect(() => {
  //   search(initialURL);
  // }, []);

  useEffect(() => {
    if (/*input*/ currentSearch == "") {
      search(initialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch, num]);

  const loadpage = () => {
    return (
      <div style={{ minHeight: "100vh" }}>
        {/*Click search button in Search component to execute the arrow function with searchURL to call the search function in Homepage component*/}
        {/*And fetch data with searchURL(included the state variable of input)*/}
        <Search
          search={() => {
            setCurrentSearch(input);
            setNum(num + 1);
            //search(searchURL);
          }}
          setInput={setInput}
        />
        <div className="pictures">
          {/*JS的邏輯運算子不一定是傳回true或false, 詳請參考下面的解釋 */}
          {data &&
            data.map((d) => {
              return <Picture data={d} />;
            })}
        </div>
        <div className="morePicture">
          <button onClick={morepicture}>Load More</button>
        </div>
      </div>
    );
  };
  //原先教學的return, 如果搜尋的結果是空的 就空空如也
  // return (
  //   <div style={{ minHeight: "100vh" }}>
  //     {/*Click search button in Search component to execute the arrow function with searchURL to call the search function in Homepage component*/}
  //     {/*And fetch data with searchURL(included the state variable of input)*/}
  //     <Search
  //       search={() => {
  //         setCurrentSearch(input);
  //         //search(searchURL);
  //       }}
  //       setInput={setInput}
  //     />
  //     <div className="pictures">
  //       {/*JS的邏輯運算子不一定是傳回true或false, 詳請參考下面的解釋 */}
  //       {data &&
  //         data.map((d) => {
  //           return <Picture data={d} />;
  //         })}
  //     </div>
  //     <div className="morePicture">
  //       <button onClick={morepicture}>Load More</button>
  //     </div>
  //   </div>
  // );

  //避免第一次剛載入畫面時, 因為useEffect還沒執行完成, data是null, 會短暫的跳出We don't find anything.
  if (num < 1) {
    return loadpage();
  } else {
    if (!data || data.length == 0) {
      return (
        <div style={{ minHeight: "100vh" }}>
          {/*Click search button in Search component to execute the arrow function with searchURL to call the search function in Homepage component*/}
          {/*And fetch data with searchURL(included the state variable of input)*/}
          <Search
            search={() => {
              setCurrentSearch(input);
              setNum(num + 1);
              //search(searchURL);
            }}
            setInput={setInput}
          />
          <div className="pictures">
            {/*JS的邏輯運算子不一定是傳回true或false, 詳請參考下面的解釋 */}
            We don't find anything.
          </div>
          <div className="morePicture">
            <button onClick={morepicture}>Load More</button>
          </div>
        </div>
      );
    } else {
      return loadpage();
    }
  }
};

export default Homepage;
