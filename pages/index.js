import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import PostList from "@/componets/PostsList";
import posts from "@/Data/post";


export default function Home() {
  console.log('home')
  return (
    <div>Hello...<h1>Simple Blog1</h1><PostList posts={posts}/></div>
  );
}
