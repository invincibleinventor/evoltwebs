"use client";
import { createClient } from "@/utils/supabase/client";
import "@mdxeditor/editor/style.css";
import MDEditor from "@uiw/react-md-editor";
import {  useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";

export default function Create() {
  const supabase = createClient();
  useEffect(()=>{
  async function check(){
    const {data:user} = await supabase.auth.getUser()
    if(user.user){
    const {data,error} = await supabase.from('user').select('*').eq('id',user.user.id)
        if(data && data[0]["isresume"]==false){
            window.location.replace('/setupresume')
        }
        else if (error) {
            console.log(error)
        }
        else{
            setid(user.user.id)
            const {data,error} = await supabase.from('resume').select('*').eq('id',user.user.id)
            if(error){
                console.log(error)
            }
            else{
                setfirstname(data[0]["firstname"])
                setlastname(data[0]["lastname"])
                setage(data[0]["age"])
                setEducation(data[0]["education"])
                setSkills(data[0]["skills"])
                setWorkHistory(data[0]["workhistory"])
                setProfessionalSummary(data[0]["professionalSummary"])
                setCertifications(data[0]["certifications"])
                setContact(data[0]["contact"])
            }
    }
}
  }
  check()
},[])
  const [id,setid] = useState('')
const [firstname,setfirstname] = useState('')
const [lastname,setlastname] = useState('')
const [age,setage] = useState('')
const [education,setEducation] = useState('')
const [certifications,setCertifications] = useState('')
const [skills,setSkills] = useState('')
const [contact,setContact] = useState('')
const [professionalSummary,setProfessionalSummary] = useState('')
const [workhistory,setWorkHistory] = useState('')


  async function create() {
    
      const { error } = await supabase.from("resume").upsert({
        id:id,
        firstname:firstname,
        lastname:lastname,
        age:parseInt(age),
        education:education,
        skills:skills,
        certifications:certifications,
        contact:contact,
        professionalSummary:professionalSummary,
        workhistory:workhistory,
      });
      if (error) {
        console.log(error);
      } else {
        window.location.replace("/");
      }
    
  }
  return (
    <>
    <div className={`mx-auto flex   w-full xl:max-w-2xl flex-col items-center justify-center px-10 `}>
      <form
        className="flex flex-col justify-center w-full gap-2 my-auto ml-auto md:pr-10 hiddenscroll animate-in text-foreground"
        action={create}
      >
        <h1 className="mt-8 mb-4 text-2xl font-bold text-black md:text-3xl">Edit Resume</h1>
        <label className="text-base" htmlFor="name">
          First Name
        </label>
        <input
                disabled = {true}

        defaultValue={firstname}
          onChange={(e) => setfirstname(e.target.value)}
          className="px-4 py-2 text-sm mb-6 border bg-inherit"
          name="name"
          placeholder="Please Type Out Your First Name"
          required
          minLength={4}
          maxLength={20}
        />
        <label className="text-sm" htmlFor="name">
          Last Name
        </label>
        <input
                disabled = {true}

        defaultValue={lastname}
          onChange={(e) => setlastname(e.target.value)}
          className="px-4 py-2 mb-6 text-sm border bg-inherit"
          name="name"
          placeholder="Please Type Out Your Last Name"
          required
          minLength={4}
          maxLength={20}
        />
        <label className="text-sm" htmlFor="name">
          Age
        </label>
        <input
        defaultValue={age}
        disabled = {true}

          onChange={(e) => setage(e.target.value)}
          className="px-4 text-sm py-2 mb-6 border bg-inherit"
          name="name"
          placeholder="Please Type Out Your Age"
          required
         type="number"
         min={14}
         max={130}
        />
        <label className="text-base" htmlFor="name">
          Education
        </label>
       <div data-color-mode="light">
            <MDEditor
              className="mx-[2px] mb-6 shrink rounded-none"
              style={{ borderRadius: "0px", height: "100px !important" }}
              value={education}
              onChange={(e) => setEducation(e!)}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
      </div>

      <label className="text-base" htmlFor="name">
          Certifications
        </label>
       <div data-color-mode="light">
            <MDEditor
              className="mx-[2px] mb-6 shrink rounded-none"
              style={{ borderRadius: "0px", height: "100px !important" }}
              value={certifications}
              onChange={(e) => setCertifications(e!)}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
      </div>

      <label className="text-base" htmlFor="name">
          Skills
        </label>
       <div data-color-mode="light">
            <MDEditor
              className="mx-[2px] mb-6 shrink rounded-none"
              style={{ borderRadius: "0px", height: "100px !important" }}
              value={skills}
              onChange={(e) => setSkills(e!)}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
      </div>

      <label className="text-base" htmlFor="name">
          Professional Summary
        </label>
       <div data-color-mode="light">
            <MDEditor
              className="mx-[2px] mb-6 shrink rounded-none"
              style={{ borderRadius: "0px", height: "100px !important" }}
              value={professionalSummary}
              onChange={(e) => setProfessionalSummary(e!)}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
      </div>

      <label className="text-base" htmlFor="name">
          Work History
        </label>
       <div data-color-mode="light">
            <MDEditor
              className="mx-[2px] mb-6 shrink rounded-none"
              style={{ borderRadius: "0px", height: "100px !important" }}
              value={workhistory}
              onChange={(e) => setWorkHistory(e!)}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
      </div>
      <label className="text-base" htmlFor="name">
         Contact
        </label>
       <div data-color-mode="light">
            <MDEditor
              className="mx-[2px] mb-6 shrink rounded-none"
              style={{ borderRadius: "0px", height: "100px !important" }}
              value={contact}
              onChange={(e) => setContact(e!)}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
      </div>
        <button className="px-8 py-4 mb-2 text-sm text-white bg-black w-max">Save Your Changes
        
      </button>
      </form>
    </div>
    </>
  );
}
