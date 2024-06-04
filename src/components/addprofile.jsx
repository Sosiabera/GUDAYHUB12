import { useState, useEffect , useRef} from 'react';
import axios from 'axios';
import "./addprofile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faFileCircleCheck,faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
<FontAwesomeIcon icon="fa-solid fa-file-code" />



export default function Addprofile(prop){

    const [inputValue, setinputValue] = useState(  {
      title: "",
      skills: [],
      workhistory: [],
      description: "",
      cv: "",
      educations: [],
      certifications: []
    } )

  
    const inputref = useRef(null)
    const [newSkill, setNewSkill] = useState('');
    const [newWork, setNewWork] = useState('');
   
    const handleNewSkillChange = (e) => {
      setNewSkill(e.target.value);
    };
    const handleNewWorkChange = (e) => {
      setNewWork(e.target.value);
    };
  
    const addSkill = () => {
      if (newSkill.trim() !== '') {
        
        setinputValue({ ...inputValue, skills: [...inputValue.skills, newSkill.trim()] });
        setNewSkill(''); // Clear the input field after adding the skill
        console.log(inputValue.skills)
      }

      if (newWork.trim() !== '') {
        
        setinputValue({ ...inputValue, workhistory: [...inputValue.workhistory, newWork.trim()] });
        setNewWork(''); // Clear the input field after adding the skill
        console.log(inputValue.workhistory)
      }

    };


 
 
const [showpages,setshowpages] = useState("")

let defalutSkill =["Communication" ,"Computer ", "Leadership ","Management ","Problem-solving ","programming ", "WordPress","Teamwork"  ]
prop.prop.freelancerprofile.skills.forEach((skill) => {
if(defalutSkill.includes(skill)){
  defalutSkill = defalutSkill.filter(item => item !== skill);
}
})
const [skillsdelete, setskillsdelete]= useState([])
const [nskillsdelete, setnskillsdelete]= useState("")
const [workdelete, setworkdelete]= useState([])
const [nworkdelete, setnworkdelete]= useState("")

const handlecv = ()=>{

    inputref.current.click();

}


const deletework = (work) =>{
  inputValue.workhistory = inputValue.workhistory.filter(item => item !== work);
  setnworkdelete("delete")
  console.log( inputValue.workhistory)

}


const deletedefalutskill = (skill) =>{
    inputValue.skills = inputValue.skills.filter(item => item !== skill);
    setnskillsdelete("delete")
    console.log( inputValue.skills)
  
}



const shownextpage = () =>{
  setshowpages("active")
}

const showthirdpage = () =>{
  setshowpages("second")
}
const showprepage = () =>{
  setshowpages("")
}
 const openDocument = (e) => {
        window.open(e.target.value, "_blank");
      }

     

      const uploadcv = async (e) =>{
        setinputValue({...inputValue, cv: e.target.files[0]});
       
        
    }

    const uploadedu = async (e) =>{
      setinputValue({...inputValue, educations:[...inputValue.educations, e.target.files[0]]});
      console.log(inputValue.educations)
       
  }

  const uploadcet= async (e) =>{

    setinputValue({...inputValue, certifications:[...inputValue.certifications, e.target.files[0]]});
}

 

    const remove =() =>{

        prop.prop2()
     
        
    }



const onsubmit = ()=>{

    editData()
    if(skillsdelete && workdelete){
      deleteSkill(skillsdelete,workdelete)
    }else{
    if(skillsdelete){
      deleteSkill(skillsdelete,[])
      console.log(skillsdelete)
  
  }
  if(workdelete){
    deleteSkill([],workdelete)
    console.log(workdelete)
  }
}
}

    const editData = async () => {

        const formData = new FormData();
        if(inputValue.title ){
          formData.append('title', inputValue.title);}
        
      if (inputValue.skills && inputValue.skills.length > 0) {
        inputValue.skills.forEach((skill, index) => {
          formData.append(`skills[${index}]`, skill);
        });
      }
      if (inputValue.workhistory && inputValue.workhistory.length > 0) {
        inputValue.workhistory.forEach((work, index) => {
          formData.append(`workhistory[${index}]`, work);
        });
      }
        if(inputValue.workhistory ){
        formData.append('description', inputValue.description);
      }
        if(inputValue.cv ){
        formData.append('cv', inputValue.cv);
      }
        
          if (inputValue.educations && inputValue.educations.length > 0) {
            inputValue.educations.forEach((edu, index) => {
              formData.append(`educationDocs[${index}]`, edu);
            });
          }

          if (inputValue.certifications && inputValue.certifications.length > 0) {
            inputValue.certifications.forEach((cer, index) => {
              formData.append(`certificationDocs[${index}]`, cer);
            });
          }
  

        console.log(inputValue)

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        try {
         await axios.put(`http://localhost:5000/freelanceredit/${prop.prop._id}`,  formData,
          {  headers: {
          'Content-Type': 'multipart/form-data'
        }})

        } catch (error) {
          console.error("errorr", error);
        }
      };

      const deleteSkill = async (skillToDelete,workdelete) => {
        try {
          const response = await axios.delete(`http://localhost:5000/freelancerdatadelete/${prop.prop._id}`,   {
            data: { skillToDelete, workdelete }} );
          
          console.log('Updated freelancer profile:', response.data);
        } catch (error) {
          console.error('Error deleting skill:', error);
        }
      };
      
   



return(
<>
<div className="addpform">
                    <div className="addp-content">
                      <div className={`firstpage${showpages}`}>
                   <div>
                    title 
            <input className="input" type="text" placeholder={prop.prop.freelancerprofile.title ? prop.prop.freelancerprofile.title : "insert your Title"}
             value={inputValue.title}
            onChange={(e) => {setinputValue({...inputValue,title:e.target.value})}}/>
            </div>
            <div className='parent-skill'>
            Your Skills
            <div style={{borderBottom:"solid",margin:"1rem",}}>
            {prop.prop.freelancerprofile.skills.map((skill) => 
        
            <>

               {!skillsdelete.includes(skill) && (
          <>
          <div className='skills'>
           <FontAwesomeIcon className='delete'onClick={() => {  setskillsdelete([...skillsdelete, skill])}} icon={faTrash} /> 
            {skill}
          
            </div>
            </>
          )}

               </> )}
            
               
           { inputValue.skills.map((nskill)=>
           <>
           {nskillsdelete != "delete" && !skillsdelete.includes(nskill) && ( 
           
             <div className='skills'>
             <FontAwesomeIcon className='delete'onClick={() => {deletedefalutskill(nskill)}} icon={faTrash} /> 
                 <>
                  {nskill} </>
                  </div>
                
            )}  </>
               )}
           
            </div>
           
            <input className="input" type="text" placeholder= "Add new skills"
            value={newSkill}
             onChange={handleNewSkillChange}/>

             <FontAwesomeIcon className='add' icon={faPlus} onClick={addSkill} /> 
             
             <br/>
             <div style={{ display: 'flex' }} ></div>
            {defalutSkill.map((dskills) =>
            <>
             
             {!inputValue.skills.includes(dskills) && (
              <div className='skills'>
               <FontAwesomeIcon className='delete' icon={faPlus} onClick={ () =>{setinputValue({ ...inputValue, skills: [...inputValue.skills, dskills] })}} /> 
              {dskills} 
              </div>
               )}
               
               </>
            ) } <br/>
            <button className='popup-btn' onClick={shownextpage} >Next</button> 
             </div>
             </div>
             <div className={`secondpage${showpages}`}>
              <div>
            overview
            <textarea style={{height:"100px", width:"650px"}} className="input" type="text"
             placeholder= {prop.prop.freelancerprofile.description ? prop.prop.freelancerprofile.description : "insert your overview"}
            value={inputValue.description}
              onChange={(e) => {setinputValue({...inputValue, description:e.target.value})}}/> <br />
           <div className='workparent'>
           <div className='workchild1' >

          Work Experience <br/>

            {prop.prop.freelancerprofile.workhistory.map((workhistory) => 
                !workdelete.includes(workhistory) ? (
                 
            <>
            <textarea style={{backgroundColor:"rgba(73, 154, 149, 0.682)"}} className="textarea" type="text"  readOnly
            value={workhistory}
              /> 
              <FontAwesomeIcon className='workadd' icon={faTrash} onClick={() => {  setworkdelete([...workdelete, workhistory])}} /> <br/>
              
</>
                )
                : null     
            )}
            { inputValue.workhistory.map((workhistory)=>
             <>
             <textarea style={{backgroundColor:"rgba(73, 154, 149, 0.682)"}} className="textarea" type="text"  readOnly

             value={workhistory}
               /> 
               <FontAwesomeIcon className='workadd' icon={faTrash} onClick={() =>{deletework(workhistory)}} /> <br/>
               
 </>
            )}
</div>
<div className='workchild2' >
              Add Work Experience <br/>
            <div>
            <textarea className="textarea" type="text"  
            placeholder={"insert your work Experience"}
            value={newWork}
            onChange={handleNewWorkChange}/> 
              <FontAwesomeIcon className='workadd' icon={faPlus} onClick={addSkill} /> <br/>
            </div>
              </div>
           </div>
              <button className='popup-btn' onClick={showprepage} >Back</button>
           <button className='popup-btn' onClick={showthirdpage} >Next</button> 
</div>
            </div>
           
            <div className={`thirdpage${showpages}`}>
              <div className='cvparent'>
            Your CV 
            {prop.prop.freelancerprofile.cv  ?
            <div className='cv1'>
              <img src={`${process.env.PUBLIC_URL}/image/cv.png`}
             onClick={() => {openDocument(prop.prop.freelancerprofile.cv)}} />
            </div>
             :null  
            }
            Change CV
          <div  className='cv2'>
            +
            <input  type="file" onChange={uploadcv}  ref={inputref} style={{display:"none"}} /> 

            <img src={`${process.env.PUBLIC_URL}/image/cvup.png`}
             onClick={handlecv} />
            </div>
            
            </div> <br/> <br/> 
            
            additional document<br/>
           <div style={{marginLeft:"-10rem",display:"inline"}}> Certifications</div> 
           <div style={{marginLeft:"-20rem",display:"inline"}}> Educations</div>  <br/>
            <div className='fileparent'>
              
            <div className='eduparent'>
           
           <div className='edu1'>
                 
            {prop.prop.freelancerprofile.additionaldoc.educations.map((educations) => 
  
             <FontAwesomeIcon icon={faFileCircleCheck} size="2x" color=' rgba(73, 154, 149, 0.61)'
             onClick={() => {openDocument(educations)}}
             style={{ marginRight: '10px' }} /> 
             
            )}
              <select class="custom-dropdown" onChange={openDocument}>
  {prop.prop.freelancerprofile.additionaldoc.educations.map((educations) => 
  
  <option value={educations}>Files</option>

)}   
</select>
  


 
     

            </div>

            
            </div>
            <div className='edu2'>
               <FontAwesomeIcon  onClick={handlecv} icon={faFileArrowUp} size="3x" />
            <input  type="file" onChange={uploadedu}    ref={inputref} style={{display:"none"}}/> 
            </div>
            
             
               
            <div className='eduparent'>

<div className='edu1'>
            
            {prop.prop.freelancerprofile.additionaldoc.certifications.map((certifications) => 
  
  <FontAwesomeIcon icon={faFileCircleCheck} size="2x" color=' rgba(73, 154, 149, 0.61)'
  onClick={() => {openDocument(certifications)}}
  style={{ marginRight: '10px' }} /> 
 )}
            </div>
               
             
            </div>

            <div className='edu2'>
               <FontAwesomeIcon  onClick={handlecv} icon={faFileArrowUp} size="2x" />
            <input  type="file" onChange={uploadcet}    ref={inputref} style={{display:"none"}}/> 
           
            </div>
            
            </div>
            <div>
           <br/> <br/> 
            </div> 
            <button className='popup-btn' onClick={shownextpage} >Back</button>
            <button className='popup-btn' onClick={()=>{onsubmit()}} >Submit</button>
            <button className='popup-btn' id='x'  onClick={remove}>X</button>
            </div>
          </div>
                  </div>
</>
)


}
