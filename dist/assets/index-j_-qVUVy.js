import{_,r as m,a as h,o as d,c as r,b as s,w as v,d as c,v as p,n as f,t as y,e as b,p as w,f as x,g as k}from"./index-DCRePMM-.js";const S=n=>(w("data-v-4bd217f8"),n=n(),x(),n),T={class:"admin-container"},U={class:"notification-card"},V=S(()=>s("div",{class:"card-title"},[s("span",{class:"bell-icon"},"🔔"),s("h2",null,"Gửi thông báo")],-1)),I={class:"input-group"},N={class:"input-group"},q={class:"input-row"},B={class:"input-group"},C={class:"input-group"},G=["disabled"],D={key:0},L={key:1},M={__name:"index",setup(n){const i=m(!1),o=h({show:!1,type:"",message:""}),t=h({title:"",message:"",url:"https://dacn.pages.dev/",icon:"https://cdn.pushalert.co/icons/default_icon-76999_2.png"}),u=(l,e)=>{o.type=l,o.message=e,o.show=!0,setTimeout(()=>{o.show=!1},3e3)},g=async()=>{i.value=!0;try{(await k.post("https://manage-restaurant.minhquancao0.workers.dev/api/notification",t,{headers:{"Content-Type":"application/json"}})).data.status=="success"?(u("success","Gửi thông báo thành công!"),t.title="",t.message=""):u("error","Không thể gửi thông báo")}catch{u("error","Đã xảy ra lỗi khi gửi thông báo")}finally{i.value=!1}};return(l,e)=>(d(),r("div",T,[s("div",U,[V,s("form",{onSubmit:v(g,["prevent"])},[s("div",I,[c(s("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>t.title=a),type:"text",placeholder:"Tiêu đề thông báo",required:""},null,512),[[p,t.title]])]),s("div",N,[c(s("textarea",{"onUpdate:modelValue":e[1]||(e[1]=a=>t.message=a),placeholder:"Nội dung thông báo",required:""},null,512),[[p,t.message]])]),s("div",q,[s("div",B,[c(s("input",{"onUpdate:modelValue":e[2]||(e[2]=a=>t.url=a),type:"url",placeholder:"URL (Tùy chọn)"},null,512),[[p,t.url]])]),s("div",C,[c(s("input",{"onUpdate:modelValue":e[3]||(e[3]=a=>t.icon=a),type:"url",placeholder:"Icon URL (Tùy chọn)"},null,512),[[p,t.icon]])])]),s("button",{type:"submit",disabled:i.value},[i.value?(d(),r("span",L,"Đang gửi...")):(d(),r("span",D,"Gửi thông báo"))],8,G)],32),o.show?(d(),r("div",{key:0,class:f(["status-message",o.type])},y(o.message),3)):b("",!0)])]))}},j=_(M,[["__scopeId","data-v-4bd217f8"]]);export{j as default};