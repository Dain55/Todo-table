let cont = document.querySelector('.container')
let add_table = document.querySelector(".div-table-add");
let id = document.querySelector('#add')
let modal = document.querySelector('.modal')
let modal_bg = document.querySelector('.modal_bg')
let btn_edit = document.querySelector('.modal_btn_b')
let btn_edit_cancel = document.querySelector('.modal_btn_r')
let modal_input = document.querySelector('.modal_input')
let modal_age = document.querySelector('.modal_age')
let modal_remove = document.querySelector('.modal_remove')
let modal_bg_remove = document.querySelector('.modal_bg_remove')
let reqInpt = document.querySelectorAll('#required')
let modalRed = document.querySelectorAll('#modalRed')
let btn_creater = document.querySelector('#btn-creater')
let name = document.querySelector('#name')
let age = document.querySelector('#age')
let btn_cancel = document.querySelector('#btn-cancel')
let btn_yes = document.querySelector('#btn-yes')
let form = document.forms.creater;




btn_creater.onclick = (e) => {
    e.preventDefault()
    let error = 0
    reqInpt.forEach(div => {
        let inp = div.querySelector('input')
        div.classList.remove('invalid')
        if (inp.value.length === 0) {
            div.classList.add('invalid')
            error++
        }
    })
    if (error > 0) {
        div.classList.add('invalid')
    } else {
        submit()
    }
}


let table = [
    {
        id: 1,
        name: "Diyor Maxmudov",
        age: 16
    }
];



function submit(e) {
    let todo = {
       id:Math.random()
    };

    let fm = new FormData(form);
  
    fm.forEach((value, key) => {
      todo[key] = value;
    });
    table.push(todo)
    reload(table)
   
}


function reload(arr) {
  add_table.innerHTML = ''
  arr = arr.sort((a, b) => (a.Title < b.Title ? -1 : 1));
  for(let item of arr) {
    let div_add = document.createElement('div')
    let div_number = document.createElement('div')
    let div_name = document.createElement('div')
    let div_age = document.createElement('div')
    let div_img = document.createElement('div')
    let p_number = document.createElement('p')
    let p_name = document.createElement('p')
    let p_age = document.createElement('p')
    let img_edit = document.createElement('img')
    let img_trash = document.createElement('img')
    let hr = document.createElement('hr')

    img_edit.src = './icon/editing.png'
    img_trash.src = '/icon/Trash.png'
     
    p_number.innerHTML = `${arr.indexOf(item) + 1}`;

    p_name.innerHTML = item.name
    p_age.innerHTML = item.age
    
    img_edit.classList.add('img-icon-edit')
    img_trash.classList.add('img-icon-trash')
    div_add.classList.add('div-add')

    add_table.append(div_add,hr)
    div_add.append(div_number,div_name,div_age,div_img)
    div_number.append(p_number)
    div_name.append(p_name)
    div_age.append(p_age)
    div_img.append(img_edit,img_trash)
    
   
    img_edit.classList.add('img-icon-edit')
    img_trash.classList.add('img-icon-trash')
    

    img_edit.onclick = () => {
        openModal(item)
        editID = item.id
    }
    img_trash.onclick = () => {
        openModalRemove()
    }
    btn_yes.onclick = () => {
        table = table.filter((el) => el.id !== item.id);
        closeModalRemove()
        reload(table, add_table);
     }
    btn_cancel.onclick = () => {
        closeModalRemove()
    }
    
  }
  
}
reload(table)



function openModalRemove(item){
    modal_remove.style.display = 'block'
    modal_bg_remove.style.display = 'block'
    setTimeout(()=>{
     modal_remove.style.opacity = '1'
     modal_bg_remove.style.opacity = '1'
    },200)
}
function closeModalRemove(item){
    modal_remove.style.opacity = '0'
    modal_bg_remove.style.opacity = '0'
    setTimeout(()=>{
        modal_remove.style.display = 'none'
        modal_bg_remove.style.display = 'none'
    },200)
}



function openModal(item) {
    name.innerHTML = `Имя:${item.name}`
    age.innerHTML = `Возраст:${item.age}`
    modal.style.display = 'block'
    modal_bg.style.display = 'block'
    setTimeout(() => {
     modal.style.opacity = '1'
     modal_bg.style.opacity = '1'
}, 200);
}
function closeModal() {
    modal.style.opacity = '0'
    modal_bg.style.opacity = '0'
    setTimeout(() => {
        modal.style.display = 'none'
        modal_bg.style.display = 'none'
}, 200);
}

modal_bg.onclick = () => {
    closeModal()
}
btn_edit_cancel.onclick = (e) => {
    e.preventDefault()
    closeModal()
}

btn_edit.onclick = (e) => {
    e.preventDefault()
    let newName = modal_input.value
    let newAge = modal_age.value
    let funded = table.find(item => item.id === editID)
    
    funded.name = newName
    funded.age = newAge
    reload(table)
    closeModal()
}