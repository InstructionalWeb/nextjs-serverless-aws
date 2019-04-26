import React from 'react';
import Axios from 'axios';
import { endpoint } from '../config';
import Parser from '../components/Parser/Parser';

const WPPage = ({ pageContent, pageTitle, slug }) => (
  <div>
    <h1>{pageTitle}</h1>
    <h2>{slug}</h2>
    <div>
      <Parser>{pageContent}</Parser>
    </div>
  </div>
);

WPPage.getInitialProps = async ({ query }) => {
  console.log(`${endpoint}wp/v2/pages?slug=${query.slug}`);
  const pageObject = Axios.get(`${endpoint}wp/v2/pages?slug=${query.slug}`)
    .catch(function(error) {
      // handle error
      console.error('*** ERROR *** WPPage.js: ', error);
    })
    .then(response => {
      console.log('Response: ', response);
      const html = response.data[0];
      let pageTitle = '';
      try {
        pageTitle = html.title.rendered;
      } catch (e) {
        console.log(e);
      }
      return {
        pageContent: html.content.rendered,
        slug: query.slug,
        pageTitle,
      };
    });

  return pageObject;
};

export default WPPage;
