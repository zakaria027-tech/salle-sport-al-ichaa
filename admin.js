const cfg=window.SUPABASE_CONFIG;
const client=window.supabase?.createClient(cfg.url,cfg.anonKey);
const $=id=>document.getElementById(id);
const OPENING_HOURS = { fr:"Lundi–samedi : 09:00–23:30\nDimanche : fermé", ar:"من الاثنين إلى السبت: 09:00 صباحاً – 11:30 ليلاً\nالأحد: مغلق", en:"Monday–Saturday: 9:00 AM–11:30 PM\nSunday: Closed" };
const GYM_MAPS_URL = "https://www.google.com/maps/place/Salle+de+Sport+El-ichaa/@30.4362711,-9.5566428,81m/data=!3m1!1e3!4m6!3m5!1s0xdb3b710adb9e99b:0xe95bc6c0277a1800!8m2!3d30.4362533!4d-9.5568238!16s%2Fg%2F11s7y2k6th?entry=ttu&g_ep=EgoyMDI2MDkyNy4xIKXMDSoASAFQAw%3D%3D";
const DEFAULT_CONTENT={
 siteName:"Salle de Sport El-ichaa",logoUrl:"",heroImage:"",
 translations:{
  fr:{heroTitle:"Dépassez vos limites.\nRévélez votre force.",heroText:"Un espace dédié à votre progression, à la musculation et aux arts martiaux.",aboutTitle:"La discipline d’aujourd’hui.\nLa force de demain.",aboutText:"Bienvenue chez Salle de Sport El-ichaa.",fitnessTitle:"Fitness & Musculation",fitnessText:"Développez votre force, votre endurance et votre condition physique.",martialTitle:"Arts martiaux",martialText:"Travaillez la technique, la maîtrise de soi et la discipline.",address:"LOT N: 3431, Agadir 80000, Morocco",hours:"À confirmer auprès du club"},
  ar:{heroTitle:"تجاوز حدودك.\nواكتشف قوتك.",heroText:"فضاء مخصص لتطوير لياقتك البدنية وقوتك.",aboutTitle:"انضباط اليوم.\nقوة الغد.",aboutText:"مرحباً بك في Salle de Sport El-ichaa.",fitnessTitle:"اللياقة البدنية وكمال الأجسام",fitnessText:"طوّر قوتك ولياقتك البدنية.",martialTitle:"الفنون القتالية",martialText:"طوّر تقنياتك وانضباطك.",address:"LOT N: 3431, Agadir 80000, Morocco",hours:"يرجى تأكيد أوقات العمل مع النادي"},
  en:{heroTitle:"Push your limits.\nUnlock your strength.",heroText:"A place dedicated to your progress.",aboutTitle:"Today's discipline.\nTomorrow's strength.",aboutText:"Welcome to Salle de Sport El-ichaa.",fitnessTitle:"Fitness & Strength",fitnessText:"Build strength, endurance and overall fitness.",martialTitle:"Martial Arts",martialText:"Develop technique and discipline.",address:"LOT N: 3431, Agadir 80000, Morocco",hours:"Please confirm opening hours with the club"}
 },
 images:{fitness:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",martial:"https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=85"},
 sports:[
  {id:"fitness",name:{fr:"Fitness & Musculation",ar:"اللياقة البدنية وكمال الأجسام",en:"Fitness & Strength"},price:"",image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85"},
  {id:"martial",name:{fr:"Arts martiaux",ar:"الفنون القتالية",en:"Martial Arts"},price:"",image:"https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=85"}
 ],
 reviews:[{name:"Rayane Rizqy",text:"The best gym ever, staff are friendly.",rating:5},{name:"HaMzA",text:"Great gym and awesome service.",rating:5},{name:"Mo. Eloukhami",text:"Excellent service.",rating:5}],
 contact:{phone:"+212682327111",whatsapp:"212682327111",address:"LOT N: 3431, Agadir 80000, Morocco",hours:"À confirmer auprès du club",maps:GYM_MAPS_URL},
 uiTranslations:{},colors:{dark:{bg:"#07100b",surface:"#0d1811",surface2:"#132219",text:"#f4f8f4",muted:"#a3b0a6",green:"#00e676",green2:"#0b8c4a",header:"#050c08",line:"#26362b"},light:{bg:"#f4f7f3",surface:"#ffffff",surface2:"#e9f1ea",text:"#102017",muted:"#5f6e63",green:"#078b48",green2:"#08743d",header:"#f8fbf8",line:"#dce5dd"}}
};
let original=null,draft=null,selected=null,previewReady=false;
const IMAGE_FIELDS=[
 {path:"heroImage",title:"Image de couverture",label:"Image principale",fallback:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80"},
 {path:"images.fitness",title:"Image — Fitness",label:"Fitness & musculation",fallback:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80"},
 {path:"images.martial",title:"Image — Arts martiaux",label:"Arts martiaux",fallback:"https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=900&q=80"},
 {path:"logoUrl",title:"Logo du club",label:"Logo du club",fallback:""}
];
const ID_FIELDS={
 brandName:{path:"siteName",title:"Nom du club"},footerName:{path:"footerName",title:"Nom النادي في أسفل الصفحة"},heroTitle:{path:"translations",key:"heroTitle",title:"Titre principal"},
 heroText:{path:"translations",key:"heroText",title:"Description principale"},aboutTitle:{path:"translations",key:"aboutTitle",title:"Titre — À propos"},
 aboutText:{path:"translations",key:"aboutText",title:"Texte — À propos"},fitnessTitle:{path:"translations",key:"fitnessTitle",title:"Titre — Fitness"},
 fitnessText:{path:"translations",key:"fitnessText",title:"Texte — Fitness"},martialTitle:{path:"translations",key:"martialTitle",title:"Titre — Arts martiaux"},
 martialText:{path:"translations",key:"martialText",title:"Texte — Arts martiaux"},addressText:{path:"translations",key:"address",title:"Adresse"},
 hoursText:{path:"translations",key:"hours",title:"Horaires"},fitnessImage:{path:"images.fitness",title:"Image — Fitness",type:"image"},
 martialImage:{path:"images.martial",title:"Image — Arts martiaux",type:"image"},heroImage:{path:"heroImage",title:"Image de couverture",type:"image"},
 brandMark:{path:"logoUrl",title:"Logo du club",type:"image"},phoneLink:{path:"contact.phone",title:"Numéro de téléphone"},whatsappLink:{path:"contact.whatsapp",title:"Numéro WhatsApp"}
};
function notify(id,text,error=false){const el=$(id);if(!el)return;el.textContent=text;el.classList.toggle("error",error);el.style.color=error?"var(--danger)":"var(--green)"}
function clone(v){return JSON.parse(JSON.stringify(v))}
function merge(base,extra){if(!extra||typeof extra!=="object"||Array.isArray(extra))return extra??base;const out=clone(base);for(const [k,v] of Object.entries(extra)){out[k]=v&&typeof v==="object"&&!Array.isArray(v)&&out[k]&&typeof out[k]==="object"&&!Array.isArray(out[k])?merge(out[k],v):v}return out}
function getPath(obj,path){return path.split(".").reduce((v,k)=>v?.[k],obj)}
function setPath(obj,path,value){const parts=path.split(".");let ref=obj;for(let i=0;i<parts.length-1;i++){if(!ref[parts[i]]||typeof ref[parts[i]]!=="object")ref[parts[i]]={};ref=ref[parts[i]]}ref[parts.at(-1)]=value}
function language(){return $("editLanguage").value}
const COLOR_DEFAULTS={dark:{bg:"#07100b",surface:"#0d1811",surface2:"#132219",text:"#f4f8f4",muted:"#a3b0a6",green:"#00e676",green2:"#0b8c4a",header:"#050c08",line:"#26362b"},light:{bg:"#f4f7f3",surface:"#ffffff",surface2:"#e9f1ea",text:"#102017",muted:"#5f6e63",green:"#078b48",green2:"#08743d",header:"#f8fbf8",line:"#dce5dd"}};
function fillColorInputs(){const themeInput=$("colorTheme");if(!themeInput)return;const mode=themeInput.value==="light"?"light":"dark",p={...COLOR_DEFAULTS[mode],...(draft?.colors?.[mode]||{})};for(const k of Object.keys(COLOR_DEFAULTS.dark)){const input=$("color"+k[0].toUpperCase()+k.slice(1));if(input)input.value=p[k]||COLOR_DEFAULTS[mode][k];}}
function setupColorEditor(){const themeInput=$("colorTheme"),applyButton=$("applyColors");if(!themeInput||!applyButton)return;fillColorInputs();themeInput.onchange=fillColorInputs;applyButton.onclick=()=>{const mode=$("colorTheme").value;draft.colors=draft.colors||clone(COLOR_DEFAULTS);draft.colors[mode]={};for(const k of Object.keys(COLOR_DEFAULTS[mode])){const input=$("color"+k[0].toUpperCase()+k.slice(1));if(input)draft.colors[mode][k]=input.value;}const doc=$("sitePreview").contentDocument;if(doc){doc.documentElement.dataset.theme=mode;const vars={bg:"--bg",surface:"--surface",surface2:"--surface2",text:"--text",muted:"--muted",green:"--green",green2:"--green2",header:"--header",line:"--line"};for(const [k,v] of Object.entries(vars))doc.documentElement.style.setProperty(v,draft.colors[mode][k]);syncPreviewTextColors(mode);}markDraft();notify("saveState","تم تطبيق ألوان الوضع "+(mode==="dark"?"الداكن":"الفاتح")+" على المعاينة.");};}
function markDraft(){ $("saveState").textContent="Modifications non publiées"; $("saveState").style.color="var(--green)" }
function cleanText(value){return String(value??"").replace(/<br\s*\/?\s*>/gi,"\n").replace(/<[^>]*>/g,"")}
function setTextNode(el,value){if(!el)return;el.replaceChildren();cleanText(value).replace(/\\n/g,"\n").split("\n").forEach((part,i)=>{if(i)el.append(document.createElement("br"));el.append(document.createTextNode(part))})}
function setHeroTitlePreview(el,value){if(!el)return;el.replaceChildren();const lines=cleanText(value).replace(/\\n/g,"\n").split("\n");lines.forEach((part,i)=>{if(i)el.append(document.createElement("br"));if(i===lines.length-1){const accent=document.createElement("span");accent.className="hero-title-accent";accent.textContent=part;el.append(accent)}else el.append(document.createTextNode(part))})}
function refreshPreview(path,value){
 const frame=$("sitePreview"),doc=frame.contentDocument;if(!doc)return;
 const byId=id=>doc.getElementById(id);
 if(path.startsWith("customImages.")){const key=path.slice("customImages.".length),el=doc.querySelector('[data-admin-image="'+key.replace(/["\\]/g,"")+'"]');if(el&&el.tagName==="IMG")el.src=value;return;}
 if(path==="siteName"){["brandName","footerName","copyrightName"].forEach(id=>{if(byId(id))byId(id).textContent=value});doc.title=value+" | Agadir"}
 else if(path==="footerName"&&byId("footerName"))byId("footerName").textContent=value
 else if(path.startsWith("translations.")){const key=path.split(".")[2];const ids={heroTitle:"heroTitle",heroText:"heroText",aboutTitle:"aboutTitle",aboutText:"aboutText",fitnessTitle:"fitnessTitle",fitnessText:"fitnessText",martialTitle:"martialTitle",martialText:"martialText",address:"addressText",hours:"hoursText"};if(key==="heroTitle")setHeroTitlePreview(byId("heroTitle"),value);else if(ids[key])setTextNode(byId(ids[key]),value);else{const el=doc.querySelector('[data-i18n="'+key+'"]');if(el)setTextNode(el,value)}}
 else if(path.startsWith("uiTranslations.")){const key=path.split(".")[2],el=doc.querySelector('[data-i18n="'+key+'"]');if(el)el.textContent=value}
 else if(path==="images.fitness"||path==="images.martial"){const id=path.endsWith("fitness")?"fitnessImage":"martialImage";if(byId(id))byId(id).src=value}
 else if(path==="heroImage"){const el=byId("heroImage");if(el)el.style.backgroundImage='linear-gradient(90deg,rgba(3,10,6,.90),rgba(3,10,6,.18)),url("'+value.replace(/["\\]/g,"")+'")'}
 else if(path==="logoUrl"){const el=byId("brandMark");if(el){el.replaceChildren();if(value){const img=doc.createElement("img");img.src=value;img.alt="Logo";img.style.cssText="width:100%;height:100%;object-fit:cover;border-radius:inherit";el.append(img)}else el.textContent="EI"}}
 else if(path==="contact.phone"&&byId("phoneLink")){byId("phoneLink").textContent=value;byId("phoneLink").href="tel:"+value.replace(/[^+0-9]/g,"")}
 else if(path==="contact.whatsapp"&&byId("whatsappLink"))byId("whatsappLink").href="https://wa.me/"+value.replace(/[^0-9]/g,"");
 else if(path==="contact.address"&&byId("addressText"))byId("addressText").textContent=value;
 else if(path==="contact.hours"&&byId("hoursText"))byId("hoursText").textContent=value;
 else if(path.startsWith("reviews.")){const i=Number(path.split(".")[1]),field=path.split(".")[2],card=doc.querySelectorAll("#reviewGrid .review")[i];if(card){if(field==="name")card.querySelector("small").textContent=value;if(field==="text")card.querySelector("p").textContent="“"+value+"”";if(field==="rating")card.querySelector(".stars").textContent="★".repeat(Math.max(0,Math.min(5,Number(value)||0)))}}
}
function renderImageLibrary(){
 const list=$("imageLibraryList");if(!list||!draft)return;list.replaceChildren();
 for(const field of IMAGE_FIELDS){
  const current=getPath(draft,field.path)||field.fallback;
  const button=document.createElement("button");button.type="button";button.className="image-library-item";
  const thumb=current?document.createElement("img"):document.createElement("span");
  if(current){thumb.src=current;thumb.alt="";thumb.loading="lazy";}else{thumb.className="image-library-placeholder";thumb.textContent="EI";}
  const copy=document.createElement("span");copy.className="image-library-copy";
  const title=document.createElement("strong");title.textContent=field.label;
  const status=document.createElement("small");status.textContent=getPath(draft,field.path)?"Image personnalisée":"Image par défaut";
  copy.append(title,status);
  const action=document.createElement("span");action.className="image-library-action";action.textContent="CHANGER ↗";
  button.append(thumb,copy,action);
  button.addEventListener("click",()=>{
   openEditor({path:field.path,title:field.title,type:"image",help:"Choisissez une nouvelle image depuis votre appareil. Elle sera prévisualisée avant publication."});
   $("imageUpload").click();
  });
  list.append(button);
 }
}
function textColorTarget(doc,key){
 if(!doc||!key)return null;const parts=key.split(":");
 if(parts[0]==="id")return doc.getElementById(parts[1]);
 if(parts[0]==="i18n")return doc.querySelector('[data-i18n="'+parts.slice(1).join(":").replace(/["\\]/g,"")+'"]');
 if(parts[0]==="review"){const card=doc.querySelectorAll("#reviewGrid .review")[Number(parts[1])];return card?.querySelector(parts[2]==="name"?"small":parts[2]==="rating"?".stars":"p")||null;}
 return null;
}
function applyPreviewTextColor(doc,key,color){const target=textColorTarget(doc,key);if(target){target.style.setProperty("--admin-text-color",color);target.style.color="var(--admin-text-color)";target.setAttribute("data-admin-text-color","1");}}
function syncPreviewTextColors(mode){const doc=$("sitePreview").contentDocument;if(!doc||!draft)return;for(const [key,color] of Object.entries(draft.textColors?.[mode]||{}))applyPreviewTextColor(doc,key,color);}
function openEditor(item){
 selected=item;$("selectionEmpty").hidden=true;$("editorPanel").hidden=false;
 $("selectedTitle").textContent=item.title;$("selectedHelp").textContent=item.help||"عدّل المحتوى ثم اضغط «تطبيق» لمعاينة النتيجة.";
 const multi=!!item.multilingual;
 $("multilingualControls").hidden=!multi;$("valueLabel").hidden=item.type==="image"||multi;$("editValue").hidden=item.type==="image"||multi;$("imageControls").hidden=item.type!=="image";$("textColorControls").hidden=item.type==="image"||!item.colorKey;
 if(multi){const defaults= $("sitePreview").contentWindow?.SITE_I18N||{};for(const [code,id] of [["fr","valueFr"],["ar","valueAr"],["en","valueEn"]]){const saved=getPath(draft,item.root+"."+code+"."+item.key);$(id).value=saved??(item.root==="uiTranslations"?(defaults[code]?.[item.key]??""):"");}}
 else if(item.type==="image"){const url=getPath(draft,item.path)||"";$("imagePreview").replaceChildren();if(url){const img=document.createElement("img");img.src=url;$("imagePreview").append(img)}$("editValue").value=url;}
 else $("editValue").value=item.value??"";
 if(item.colorKey){$("textColorDark").value=draft.textColors?.dark?.[item.colorKey]||"#f4f8f4";$("textColorLight").value=draft.textColors?.light?.[item.colorKey]||"#102017";}
 $("editMessage").textContent="";
}
function resolveSelection(target,doc){
 const review=target.closest(".review");if(review){const cards=[...doc.querySelectorAll("#reviewGrid .review")],i=cards.indexOf(review);if(i<0)return null;let field="text";if(target.closest("small"))field="name";else if(target.closest(".stars"))field="rating";const path="reviews."+i+"."+field;return{path,colorKey:"review:"+i+":"+field,title:"Avis client · "+(i+1),value:getPath(draft,path),type:field==="rating"?"number":"text",help:"Modifiez cet avis. Le changement sera publié sur le site après validation."}}
 const keyed=target.closest("[id]");if(keyed&&ID_FIELDS[keyed.id]){const f=ID_FIELDS[keyed.id],path=f.path==="translations"?"translations."+language()+"."+f.key:f.path;return{path,colorKey:f.type==="image"?null:"id:"+keyed.id,root:f.path==="translations"?"translations":null,key:f.key||null,multilingual:f.path==="translations",title:f.title,value:getPath(draft,path),type:f.type||"text",help:f.type==="image"?"Choisissez une nouvelle image depuis votre appareil.":f.path==="translations"?"Modifiez les trois versions linguistiques du texte.":"Modifiez ce texte."}}
 const image=target.closest("img");if(image){const key=image.dataset.adminImage||image.id;if(key){const path="customImages."+key;return{path,title:"Image — "+(image.alt||image.id||key),type:"image",value:getPath(draft,path)||image.currentSrc||image.src,help:"Remplacez cette image depuis votre appareil. Le changement sera enregistré dans la configuration du site."}}}
 const translated=target.closest("[data-i18n]");if(translated){const key=translated.dataset.i18n,path="uiTranslations."+language()+"."+key;return{path,colorKey:"i18n:"+key,root:"uiTranslations",key,multilingual:true,title:"Texte du site · "+key,value:getPath(draft,path)??translated.textContent,type:"text",help:"Modifiez les trois versions linguistiques de ce libellé."}}
 return null;
}
function attachPreview(){
 const frame=$("sitePreview"),doc=frame.contentDocument;if(!doc||previewReady)return;previewReady=true;
 const style=doc.createElement("style");style.textContent="body *{cursor:crosshair!important}body [id],body [data-i18n],body img,#reviewGrid .review{outline:1px dashed transparent;outline-offset:3px}body [id]:hover,body [data-i18n]:hover,body img:hover,#reviewGrid .review:hover{outline:2px dashed #00d978!important;outline-offset:3px}";doc.head.append(style);
 doc.querySelectorAll("img").forEach((img,i)=>{if(!img.dataset.adminImage)img.dataset.adminImage=img.id||("image-"+i)});
 doc.addEventListener("click",e=>{const item=resolveSelection(e.target,doc);if(!item)return;e.preventDefault();e.stopPropagation();openEditor(item);if(item.type==="image"){requestAnimationFrame(()=>{$("imageControls").scrollIntoView({behavior:"smooth",block:"nearest"});$("imageUpload").focus({preventScroll:true});});}},true);
}
function sportName(sport,code){return sport?.name?.[code]||sport?.name?.fr||sport?.name?.en||""}
function renderSportsPreview(){
 const doc=$("sitePreview").contentDocument,grid=doc?.getElementById("sportsGrid");if(!grid||!draft)return;
 grid.replaceChildren();const code=language(),pending={fr:"Tarif à confirmer",ar:"السعر يحدد من الإدارة",en:"Price to be confirmed"};
 (draft.sports||[]).forEach(sport=>{
  const card=doc.createElement("article");card.className="sport-price-card";
  const title=doc.createElement("h3");title.textContent=cleanText(sportName(sport,code)||"Sport");
  const media=doc.createElement("div");media.className="sport-price-media";
  if(sport.image){const img=doc.createElement("img");img.src=sport.image;img.alt=title.textContent;media.append(img);}
  else{const placeholder=doc.createElement("span");placeholder.className="sport-image-placeholder";placeholder.textContent="EL-ICHAA";media.append(placeholder);}
  const price=doc.createElement("p");price.className="sport-price-value";price.textContent=cleanText(String(sport.price||"").trim())||pending[code];
  card.append(title,media,price);grid.append(card);
 });
}
function renderSportsManager(){
 const list=$("sportsManagerList");if(!list||!draft)return;list.replaceChildren();
 (draft.sports||[]).forEach((sport,index)=>{
  const card=document.createElement("article");card.className="sports-manager-card";
  const heading=document.createElement("div");heading.className="sports-manager-heading";
  const title=document.createElement("strong");title.textContent="رياضة "+(index+1);heading.append(title);
  const remove=document.createElement("button");remove.type="button";remove.className="button button-quiet sports-remove-button";remove.textContent="حذف";remove.dataset.removeSport=sport.id;heading.append(remove);card.append(heading);
  const fields=document.createElement("div");fields.className="sports-manager-fields";
  for(const [code,label,dir] of [["fr","Français","ltr"],["ar","العربية","rtl"],["en","English","ltr"]]){
   const wrap=document.createElement("label");wrap.className="sports-field";wrap.textContent="الاسم — "+label;
   const input=document.createElement("input");input.type="text";input.value=cleanText(sport.name?.[code]||"");input.placeholder="اسم الرياضة";input.dir=dir;input.dataset.sportId=sport.id;input.dataset.sportField="name."+code;wrap.append(input);fields.append(wrap);
  }
  const priceWrap=document.createElement("label");priceWrap.className="sports-field";priceWrap.textContent="السعر";
  const priceInput=document.createElement("input");priceInput.type="text";priceInput.value=sport.price||"";priceInput.placeholder="مثال: 150 درهم / الشهر";priceInput.dataset.sportId=sport.id;priceInput.dataset.sportField="price";priceWrap.append(priceInput);fields.append(priceWrap);card.append(fields);
  const imageRow=document.createElement("div");imageRow.className="sports-image-row";
  const image=sport.image?document.createElement("img"):document.createElement("span");if(sport.image){image.src=sport.image;image.alt="";}else{image.className="sports-image-placeholder";image.textContent="بدون صورة";}
  const uploadLabel=document.createElement("label");uploadLabel.className="button button-quiet sports-upload-label";uploadLabel.textContent="تغيير صورة هذه الرياضة";
  const file=document.createElement("input");file.type="file";file.accept="image/*";file.hidden=true;file.dataset.sportUpload=sport.id;uploadLabel.append(file);
  imageRow.append(image,uploadLabel);card.append(imageRow);list.append(card);
  file.addEventListener("change",async e=>{
   const chosen=e.target.files?.[0];if(!chosen)return;
   if(!chosen.type.startsWith("image/")){notify("saveState","يرجى اختيار ملف صورة صالح.",true);return;}
   if(chosen.size>5*1024*1024){notify("saveState","حجم الصورة يتجاوز 5 ميغابايت.",true);return;}
   const safeName=chosen.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]/g,"-"),path="sports/"+sport.id+"-"+Date.now()+"-"+safeName;
   notify("saveState","جارٍ رفع صورة الرياضة…");
   const {error}=await client.storage.from("site-media").upload(path,chosen,{cacheControl:"3600",upsert:false,contentType:chosen.type});
   if(error){notify("saveState","فشل رفع الصورة: "+error.message,true);return;}
   const {data}=client.storage.from("site-media").getPublicUrl(path),target=draft.sports.find(item=>item.id===sport.id);
   if(target)target.image=data.publicUrl;
   renderSportsManager();renderSportsPreview();markDraft();notify("saveState","تم تحديث الصورة في المعاينة. اضغط نشر لإظهارها للزوار.");
  });
 });
}
async function loadContent(){
 const {data,error}=await client.from("site_content").select("content").eq("id","main").maybeSingle();if(error)throw error;
 original=merge(DEFAULT_CONTENT,data?.content||{});original.contact=original.contact||{};original.contact.maps=GYM_MAPS_URL;for(const code of ["fr","ar","en"]){original.translations[code]=original.translations[code]||{};original.translations[code].hours=OPENING_HOURS[code];}draft=clone(original);draft.sports=Array.isArray(draft.sports)?draft.sports:clone(DEFAULT_CONTENT.sports);setupColorEditor();renderImageLibrary();renderSportsManager();renderSportsPreview();$("saveState").textContent="Toutes les modifications sont enregistrées";$("saveState").style.color="var(--muted)";
}
function showDashboard(user){$("loginPanel").hidden=true;$("dashboard").hidden=false;$("logoutBtn").hidden=false;notify("loginMessage","");attachPreview();}
async function afterLogin(user){showDashboard(user);try{await loadContent()}catch(e){notify("saveState","Erreur de chargement : "+e.message,true)}}
$("loginForm").addEventListener("submit",async e=>{e.preventDefault();notify("loginMessage","Connexion en cours…");const {data,error}=await client.auth.signInWithPassword({email:$("email").value,password:$("password").value});if(error){notify("loginMessage",error.message,true);return}await afterLogin(data.user)});
$("logoutBtn").addEventListener("click",async()=>{await client.auth.signOut();$("dashboard").hidden=true;$("loginPanel").hidden=false;$("logoutBtn").hidden=true;$("password").value="";});
$("themeToggle").addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=next;localStorage.setItem("elichaa-admin-theme",next);$("themeToggle").textContent=next==="dark"?"☼":"☾"});
const savedTheme=localStorage.getItem("elichaa-admin-theme")||"dark";document.documentElement.dataset.theme=savedTheme;$("themeToggle").textContent=savedTheme==="dark"?"☼":"☾";
$("sitePreview").addEventListener("load",()=>{previewReady=false;attachPreview();renderSportsPreview()});
$("editLanguage").addEventListener("change",()=>{const doc=$("sitePreview").contentDocument,sel=doc?.getElementById("languageSelect");if(sel){sel.value=language();sel.dispatchEvent(new Event("change",{bubbles:true}))}renderSportsPreview();openEditorEmpty()});
$("sportsManagerList").addEventListener("input",e=>{
 const input=e.target.closest("[data-sport-id][data-sport-field]");if(!input||!draft)return;
 const sport=draft.sports.find(item=>item.id===input.dataset.sportId);if(!sport)return;
 const [root,code]=input.dataset.sportField.split(".");
 if(root==="name"){sport.name=sport.name||{};sport.name[code]=input.value;}else sport[root]=input.value;
 renderSportsPreview();markDraft();
});
$("sportsManagerList").addEventListener("click",e=>{
 const button=e.target.closest("[data-remove-sport]");if(!button||!draft)return;
 const id=button.dataset.removeSport;if(!confirm("هل تريد حذف هذه الرياضة من قائمة الأسعار؟"))return;
 draft.sports=draft.sports.filter(item=>item.id!==id);renderSportsManager();renderSportsPreview();markDraft();
});
$("addSportBtn").addEventListener("click",()=>{
 draft.sports=draft.sports||[];const id="sport-"+Date.now()+"-"+Math.random().toString(36).slice(2,7);
 draft.sports.push({id,name:{fr:"",ar:"",en:""},price:"",image:""});
 renderSportsManager();renderSportsPreview();markDraft();
});
function openEditorEmpty(){$("editorPanel").hidden=true;$("selectionEmpty").hidden=false;selected=null}
$("applyEdit").addEventListener("click",()=>{if(!selected)return;if(selected.multilingual){for(const [code,id] of [["fr","valueFr"],["ar","valueAr"],["en","valueEn"]])setPath(draft,selected.root+"."+code+"."+selected.key,$(id).value);const activePath=selected.root+"."+language()+"."+selected.key;refreshPreview(activePath,getPath(draft,activePath));}else{let value=$("editValue").value;if(selected.type==="number"){value=Number(value);if(!Number.isFinite(value)||value<0||value>5){notify("editMessage","La note doit être comprise entre 0 et 5.",true);return}}setPath(draft,selected.path,value);refreshPreview(selected.path,value);if(selected.type==="image"){$("imagePreview").replaceChildren();if(value){const img=document.createElement("img");img.src=value;$("imagePreview").append(img)}renderImageLibrary();}}markDraft();notify("editMessage",selected.multilingual?"Les trois traductions ont été appliquées à l’aperçu.":"Modification appliquée à l’aperçu.")});
$("applyTextColors").addEventListener("click",()=>{
 if(!selected?.colorKey||selected.type==="image")return;
 draft.textColors=draft.textColors||{dark:{},light:{}};draft.textColors.dark=draft.textColors.dark||{};draft.textColors.light=draft.textColors.light||{};
 draft.textColors.dark[selected.colorKey]=$("textColorDark").value;draft.textColors.light[selected.colorKey]=$("textColorLight").value;
 const doc=$("sitePreview").contentDocument,mode=$("colorTheme").value==="light"?"light":"dark";
 if(doc){doc.documentElement.dataset.theme=mode;const palette=draft.colors?.[mode]||COLOR_DEFAULTS[mode],vars={bg:"--bg",surface:"--surface",surface2:"--surface2",text:"--text",muted:"--muted",green:"--green",green2:"--green2",header:"--header",line:"--line"};for(const [k,v] of Object.entries(vars))if(palette[k])doc.documentElement.style.setProperty(v,palette[k]);syncPreviewTextColors(mode);applyPreviewTextColor(doc,selected.colorKey,draft.textColors[mode][selected.colorKey]);}
 markDraft();notify("editMessage","تم حفظ لون هذا النص للوضع الداكن والفاتح في المسودة. انشر التغييرات لتظهر للزوار.");
});
$("cancelEdit").addEventListener("click",openEditorEmpty);
$("imageUpload").addEventListener("change",async e=>{const file=e.target.files?.[0];if(!file||!selected)return;if(!file.type.startsWith("image/")){notify("editMessage","Veuillez choisir un fichier image.",true);return}if(file.size>5*1024*1024){notify("editMessage","L’image dépasse la limite de 5 Mo.",true);return}
 const safeName=file.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]/g,"-");const path=Date.now()+"-"+Math.random().toString(36).slice(2,8)+"-"+safeName;notify("editMessage","Téléversement de l’image…");$("imageUpload").disabled=true;
 const {error}=await client.storage.from("site-media").upload(path,file,{cacheControl:"3600",upsert:false,contentType:file.type});$("imageUpload").disabled=false;
 if(error){notify("editMessage","Échec du téléversement : "+error.message,true);e.target.value="";return}
 const {data}=client.storage.from("site-media").getPublicUrl(path);setPath(draft,selected.path,data.publicUrl);refreshPreview(selected.path,data.publicUrl);$("imagePreview").replaceChildren();const img=document.createElement("img");img.src=data.publicUrl;$("imagePreview").append(img);$("editValue").value=data.publicUrl;renderImageLibrary();markDraft();notify("editMessage","Image ajoutée à l’aperçu. Cliquez sur Publier pour la mettre en ligne.");e.target.value="";
});
$("publishBtn").addEventListener("click",async()=>{if(!draft)return;$("publishBtn").disabled=true;$("publishBtn").textContent="Publication…";const {error}=await client.from("site_content").upsert({id:"main",content:draft,updated_at:new Date().toISOString()},{onConflict:"id"});$("publishBtn").disabled=false;$("publishBtn").textContent="Publier les modifications ↗";if(error){notify("saveState","Échec de publication : "+error.message,true);return}original=clone(draft);$("saveState").textContent="Publié avec succès";$("saveState").style.color="var(--green)";});
$("discardBtn").addEventListener("click",async()=>{if(!confirm("Annuler toutes les modifications non publiées ?"))return;try{await loadContent();$("sitePreview").contentWindow.location.reload();openEditorEmpty()}catch(e){notify("saveState","Impossible de recharger : "+e.message,true)}});
async function checkSession(){if(!client){notify("loginMessage","Configuration Supabase absente.",true);return}const {data,error}=await client.auth.getSession();if(error){notify("loginMessage",error.message,true);return}if(data.session)await afterLogin(data.session.user)}
checkSession();
