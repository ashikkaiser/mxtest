/** @format */

import dynamic from "next/dynamic";
import Head from "next/head";
import CallToAction from "../components/call-to-action";
import PopularCategories from "../components/popular-categories";
import PopularSoft from "../components/popular-softwares";
import TrendingCate from "../components/trending-categories";
import { useRouter } from "next/router";
import useFetch from "../lib/useFatch"
const Banner = dynamic(() => import("../components/banner"));


export default function Home({ country }) {
  const { data: trendingProductData } = useFetch('https://api.spotsaas.com/home/quick-link', country)
  const { data: data } = useFetch('https://api.spotsaas.com/product/home-page', country)
  const { data: CateData } = useFetch('https://api.spotsaas.com/category/home-page', country)
  const { data: PopularCate } = useFetch('https://api.spotsaas.com/home/popular-categories', country)
  const { data: recentlyAdded } = useFetch('https://api.spotsaas.com/product/home-page/recently-added', country)
  const router = useRouter();
  const host = 'https://www.spotsaas.com';
  const path = router.asPath;
  return (
    <>
      <Head>
        <title>Spotsaas | Latest Business software, Review & Comparison.</title>
        <meta
          name="description"
          content="Find top software and tool for your team with indepth descriptions. Get the best business app and tool with verified reviews, ratings & comparison only at spotsaas.com"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href={host + path} />
      </Head>
      <Banner trendingproducts={trendingProductData} />
      {CateData.length && <TrendingCate data={CateData} />}

      <PopularSoft title="Popular Software" data={data} />
      <CallToAction />
      <PopularSoft title="Recently Added Software" data={recentlyAdded} />
      {/* <PopularArticles posts={posts} /> */}
      <PopularCategories data={PopularCate} />
      {/* <Advertises /> */}
    </>
  );
}

