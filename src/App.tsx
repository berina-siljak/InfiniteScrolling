import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Heading } from './components/Heading'
import { Loader } from './components/Loader'
import { PicsumImage } from './components/PicsumImage'
import axios from 'axios';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

//Style
const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body
{
  font-family:sans-serif;
}
`;

const WrapperImage = styled.section`
max-width: 70rem;
margin: 4rem auto;
display: grid;
grid-gap: 1em;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
grid-auto-rows: 300px;

`;


var pageNumber = 1;

function App() {
  const [images, setImages] = React.useState([] as any);

  useEffect(() => {
    fetchImages();
  }, [])

  const fetchImages = () => {
    const apiRoot = "https://picsum.photos/v2/";
    pageNumber++;
    axios
      .get(`${apiRoot}/list?page=${pageNumber}`)
      .then(res =>
        setImages([...images, ...res.data]))
  }
  return (
    <div className="App">
      <Heading></Heading>
      <GlobalStyle></GlobalStyle>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader></Loader>}
      >
        <WrapperImage>
          {images.map(image => (
            <PicsumImage url={image.download_url} key={image.id}></PicsumImage>
          ))}
        </WrapperImage>
      </InfiniteScroll>
    </div>
  );
}


export default App;






