
const JSON_PATH = "index.json";

class Entity 
{
    constructor(name,imglist,desc, render_imgdesc_callback)
    {
        this.name = name;
        this.imglist = imglist;
        this.desc = desc;

        this._onClick = this._onClick.bind(this);  
        this.render_imgdesc_callback =render_imgdesc_callback;

    }
    _onClick()
    {   
        this.render_imgdesc_callback(this.imglist, this.desc);
    }
    
}

class Data {
  constructor()
  {
      this.entitylist = [];
      this.get_json = this.get_json.bind(this);

      this._render_the_names = this._render_the_names.bind(this);
      this._render_img_desc = this._render_img_desc.bind(this);
  }    

  get_json(json)
  {
      const elist = json;
      for(const item of elist)
      {
          const ent = new Entity(item.entity,item.images,item.Desc, this._render_img_desc);
          this.entitylist.push(ent);
      }
      this._render_the_names();
  }
  get_the_entities()
  {
      fetch(JSON_PATH).then((response)=>response.json()).then(this.get_json);
  }

  _render_the_names()
  {
      const entitycontainer = document.querySelector(".entity");
      for(const ent of this.entitylist)
      {
        const btn = document.createElement('button');
        btn.innerHTML = `${ent.name}`;
        
        const div = document.createElement('div');
        div.classList.add("btn_div");
        div.appendChild(btn);
        entitycontainer.appendChild(div);
        btn.addEventListener('click',ent._onClick);
      }

  }

  _render_img_desc(imglist, desc)
    {
        const imagecontainer = document.querySelector(".image_box ");
        imagecontainer.innerHTML = "";
        const images = imglist;
        const descriptions = desc;
        for(let i=0; i<images.length; i++)
        {
            const img = document.createElement("img");
            img.src = images[i];
            const desc_val= descriptions[i];
            
            
            img.addEventListener('click',() => {  
                const desc_box = document.querySelector(".description_section");
                desc_box.innerHTML = '';
                const p = document.createElement('p');
                p.innerText = desc_val;
                console.log(desc_val);
                desc_box.appendChild(p);
            });
            const div = document.createElement("div");
            div.classList.add("img_div");
            div.appendChild(img);
            
            imagecontainer.appendChild(img);
        }
    }
}

const data = new Data();
data.get_the_entities();
        
        