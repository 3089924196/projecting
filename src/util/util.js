export function transform(node,type,val) {
  if(!node.transform){node.transform={}}
  if(arguments.length === 3){
      //设置
      var text = "";
      node.transform[type] = val;

      for(var name in node.transform){
          switch (name){
              case "translateX":
              case "translateY":
              case "translateZ":
                  text+=name+"("+node.transform[name]+"px) "
                  break;
              case "rotateX":
              case "rotateY":
              case "rotate":
                  text+=name+"("+node.transform[name]+"deg) "
                  break;
              case "scaleX":
              case "scaleY":
              case "scale":
                  text+=name+"("+node.transform[name]+") "
                  break;
          }
      }

      node.style.transform = node.style.webkitTransform = text;
  }else if(arguments.length === 2){
      //读取
      val = node.transform[type]
      if(val === undefined){
          //返回默认值
          switch (type){
              case "translateX":
              case "translateY":
              case "translateZ":
              case "rotateX":
              case "rotateY":
              case "rotate":
                  val = 0;
                  break;
              case "scaleX":
              case "scaleY":
              case "scale":
                  val = 1;
                  break;
          }
      }
      return val
  }
}