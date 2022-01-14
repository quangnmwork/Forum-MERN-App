import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { Input } from "@chakra-ui/react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then(mod => mod.default), { ssr: false });

function md() {
  const [value, setValue] = useState("**Hello world!!!**");
  const [img, setImg] = useState();
  const [selectAvatar, setSelectAvatar] = useState();
  const titleRef = useRef(null);
  const imageUploadOnchange = e => {
    if (!e.target.files || e.target.files.length == 0) {
      setSelectAvatar(undefined);
      return;
    } else setSelectAvatar(e.target.files[0]);
  };
  const submit = async e => {
    try {
      e.preventDefault();
      console.log(selectAvatar);
      console.log(titleRef.current.value);
    } catch (err) {}
  };
  return (
    <div>
      <button onClick={submit} style={{ px: "3px", fontSize: "15px", backgroundColor: "blue" }}>
        Nop bai
      </button>
      <Input ref={titleRef} />
      <Input type={"file"} accept={"image/*"} onChange={imageUploadOnchange} />
      <MDEditor value={value} />
    </div>
  );
}
export default md;
