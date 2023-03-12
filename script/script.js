// async use to data fetch
let rest='';
const fetchdata = async (value = true) => {
  
    const URL = " https://openapi.programming-hero.com/api/ai/tools";
    const fetchUrl = await fetch(URL);
    const fetchJason = await fetchUrl.json();
    let data
    if (value === true) {
        // button inner text change 
        document.getElementById('showMore').innerText = `Show More`
        data = fetchJason.data.tools.slice(0, 6);
    }

    else {
        //button inner text change show less
        document.getElementById('showMore').innerText = `Show less`
        data = fetchJason.data.tools;
    }
    // console.log(data);

    rest=data
 
    showData(data)
}
// show dat  in first page 
const showData = (data,value=true) => {
     //clear interface
    document.getElementById('content').innerHTML = ``;
    
    let card = document.getElementById('content');
    let main ='';
    if(value===false){
    main = data.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        return dateA - dateB
    })}else{
        main=data
    }
    console.log(main);
    main.forEach(el => {
        // distructure
        const { name, published_in, image, features, id } = el;
        const featuresPoint = reusableArray(features);
        card.innerHTML += `<div class="card w-76 bg-base-100 shadow-xl">
       <figure>
           <img
               src="${image}"
               alt=""
           />
       </figure>
       <div class="card-body">
           <h2 class="card-title">Fetures</h2>
           <ol  class="list-decimal">
               ${featuresPoint}
              
           </ol>
           <hr />
           <div class="card-actions  justify-between items-center">
               <div>
                   <h3 class="text-2xl font-bold">${name}</h3>
                   <p class="font-light "><i class="fa-regular  mx-2 fa-calendar-days"></i>${dateFormat(published_in)}</p>
               </div>
               <label for="my-modal-5"onclick="showModal('${id}')" class="bg-red-300 rounded-full p-2 text-white w-8 h-8 flex justify-center items-center" ><i class="fa-solid fa-arrow-right"></i></label>
           </div>
       </div>
   </div> 
       `
    });
    //pogress end
    pogress(false);
}
const showModal = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const fetchUrl = await fetch(URL);
    const fetchJason = await fetchUrl.json();
    const data = fetchJason.data;
    // distruction modal element 
    const { tool_name, description, image_link, accuracy, pricing, input_output_examples, features, integrations } = data;
    console.log(data);
    const feture = reusableObj(features);
    const integration = reusableArray(integrations)
    const modal = document.getElementById('modal-demo');
    // modal intregration and customize 
    modal.innerHTML = `
    <div   class="modal-box w-10/12 max-w-5xl  gap-4 grid grid-cols-1 lg:md:grid-cols-2">
    <div  class="flex flex-col  bg-red-200 border-red-600 border-solid border-2 p-4">
    <h3 class="text-2xl font-semibold">${description}</h3>
    <div class="grid grid-cols-3 gap-2 p-3 text-center">
        <div class="text-green-600 font-semibold bg-white rounded-md">${pricing ? pricing[0].price + `</br>` + pricing[0].plan : 'Free Of Cost/Basic'}</div>
        <div class="text-yellow-600 font-semibold bg-white rounded-md flex">${pricing ? pricing[1].price + `</br>` + pricing[1].plan : 'Free Of Cost/Stander'}</div>
        <div class="text-red-600 font-semibold bg-white rounded-md">${pricing ? pricing[2].price + `</br>` + pricing[2].plan : 'Free Of Cost/Enterprice'}</div>
    </div>
    <div class="flex justify-between p-2">
        <div>
            <h3 class="text-2xl font-regular">Feture</h3>
            <ol class="list-disc">
          ${feture}
            </ol>
        </div>
        <div>
            <h3 class="text-xl font-regular">Intregration</h3>
            <ol class="list-disc my-3">
          ${integration}
            </ol>
        </div>
    </div>
</div>
<div>
    <div class="modal-action">
        <label for="my-modal-5" class="bg-red-400 rounded-full absolute top-0 right-0  text-white p-3.5 w-4 h-4 flex justify-center items-center ">X</label>
    </div>
<div class="relative">
${image_link ? `<img src="${image_link[0]}" alt="" srcset="" class="w-full">` : "<h3 class='text-3xl bg-red-200 text-white'>Not Found<h3>"}
${accuracy.score ? `<h2 class="text-2xl font-semibold text-white bg-red-600 m-2 px-2 rounded-md  absolute top-0 right-0 ">${accuracy.score * 100}% acurecy</h2>
</div>`: ''}

<div>
    <h3 class="text-3xl font-bold ">${input_output_examples ? input_output_examples[0].input : "Not Found Data"}</h3>
    <p>${input_output_examples ? input_output_examples[0].output : "Not Found Data"}</p>
</div>
</div>
</div>`;

}
//fetch data when load
fetchdata();

// for object 
const reusableObj = (obj) => {
    let element = ``;

    for (const key in obj) {

        element += `<li>${obj[key].feature_name}</li>`;


    }
    return element;
}

// for array 
const reusableArray = (arr) => {

    let element = ``;
    if (arr) {
        for (const ele of arr) {

            element += `<li>${ele}</li>`;


        }

    } else {
        element = 'Not found data'
    }
    return element;
}

//showMore function

let shomore = true
const showMore = () => {
    shomore = !shomore
    pogress(true)
    fetchdata(shomore)

}
//pogress js
const pogress = (value) => {
    const pogress = document.getElementById('spinner')
    if (value === true) {
        pogress.classList.remove('hidden')
    } else {
        pogress.classList.add('hidden')
    }

}
// date sorting 
const sortByDate=()=>{
    showData(rest,false)
}
// date formate 
const dateFormat=(dateStr)=>{

    const [month, day, year] = dateStr.split('/');
    let formattedDay = day;
    if (day < 10) {
      formattedDay = '0' + day;
    }
    const formattedDateStr = `${month}/${formattedDay}/${year}`;
    return formattedDateStr;
}