/** @format */

import Head from "next/head";
import { useContext, useEffect } from "react";
import Advertise from "../components/advertise";
import AllCategories from "../components/categories/all-categories";
import HeaderContext from "../context/headerContext";

export async function getServerSideProps(context) {
  // Product api fetch
  const res = await fetch(`https://api.spotsaas.com/all-categories`);
  const allCate = await res.json();

  if (!allCate) {
    return {
      notFound: true,
    };
  }

  return {
    props: { allCate }, // will be passed to the page component as props
  };
}
export default function Home({ allCate }) {
  const { setBreadcrumbs } = useContext(HeaderContext);

  useEffect(() => {
    let array = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: `All Categories`,
        link: ``,
      },
    ];
    setBreadcrumbs(array);
  }, [allCate]);

  return (
    <div>
      <Head>
        <title>All Categories | spotSaaS</title>
        <meta
          name="description"
          content="You can choose the right software and services for your business based on our best score."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <AllCategories data={allCate} />
      <Advertise />
    </div>
  );
}
