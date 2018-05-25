(function(){
  var script=document.createElement('script');
  var url='http://192.168.1.65:8081/';
  script.type="text/javascript";
  script.src=url+'service/jquery.js';
  document.getElementsByTagName('head')[0].appendChild(script);
  var style=document.createElement('link');
  style.setAttribute('rel','stylesheet');
  style.setAttribute('type','text/css');
  style.setAttribute('href',url+'service/ser_css.css');
  document.getElementsByTagName('head')[0].appendChild(style);
  setTimeout(function(){
    ready()
  },500);
  function ready(){

    var params=document.getElementsByTagName('script')[0].src;
    params=params.split('id=');
    params=params[1];  //携带不同参数

    var btn=$('<div class="chat_entry">'+
                '<img class="entry_img" src="">'+
              '</div>');

    var popup=$('<div class="popup_chat">'+
                  '<div class="chat_title">'+
                    '<span class="chat_t_span">智能律师</span>'+
                    '<p class="chat_p">'+
                      '<span class="chat_t_min">-</span>'+
                      '<span class="chat_t_max">o</span>'+
                      '<span class="chat_t_close">x</span>'+
                    '</p>'+
                  '</div>'+
                  '<div class="chat_box">'+
                  '</div>'+
                  '<div class="chat_emit_box">'+
                    '<textarea class="chat_area" placeholder="输入文字并直接回复">'+
                    '</textarea>'+
                    '<div class="chat_emit">发送'+
                    '</div>'+
                  '</div>'+
                '</div>');
    $('body').append(btn,popup);
    $('.entry_img').attr('src',url+'service/smart_robert.jpg');

    var chatArr=[
      {type:1,text:'你去那',time:'2051-12-6',name:'小明'},
      {type:2,text:'回家',time:'2051-12-6',name:'大锤'},
      {type:1,text:'你去那',time:'2051-12-6',name:'量量'},
      {type:2,text:'去你家',time:'2051-12-6',name:'放噶'},
    ];
    var len=chatArr.length;
    var $box=$('.chat_box');
    var $popup=$('.popup_chat');
    for(var i=0;i<len;i++){
      var $list=$('<div class="chat_box_'+chatArr[i].type+'">'+
                    '<p class="chat_list_p_'+chatArr[i].type+'">'+
                      '<span class="chat_time">'+chatArr[i].time+'</span>'+
                      '<span class="chat_name">'+chatArr[i].name+'</span>'+
                    '</p>'+
                    '<div class="chat_text_'+chatArr[i].type+'">'+chatArr[i].text+'</div>'+
                  '</div>'
                );
          $list.appendTo($box);
    };

    $('.chat_entry').click(function(){
      $(".popup_chat").fadeIn();
      $(".popup_chat").fadeIn("slow");
      $(".popup_chat").fadeIn(100);
    });

    var bodyW=$(window).width();
    var bodyH=$(window).height();
    var popupW=$popup.width();
    var popupH=$popup.height();
    $popup.css({'left':(bodyW-popupW)/2+'px','top':(bodyH-popupH)/2+'px'});
    // if(document.attachEvent) {//ie的事件监听，拖拽div时禁止选中内容，firefox与chrome已在css中设置过-moz-user-select: none; -webkit-user-select: none;
    //     $popup.attachEvent('onselectstart', function() {
    //       return false;
    //     });
    // }
    var onOff=false;
    var mx=0,my=0;//鼠标坐标
    var dx=0,dy=0;//弹窗坐标
    var left_,top_;
    var moveX,moveY;
    var onOff_foucus=false;
    $popup.mousedown(function(e){//按下鼠标
      onOff=true;
      e=e||window.event;
      mx=e.pageX;
      my=e.pageY;
      dx=$popup.offset().left;
      dy=$popup.offset().top;
    });
    $('.chat_area').focus(function(){
      onOff_foucus=true;
    });
    $('.chat_area').blur(function(){
      onOff_foucus=false;
    })

    $popup.mouseup(function(e){//松开鼠标
      onOff=false;
    });

    //关闭弹窗
    $('.chat_t_close').click(function(){
      $popup.hide()
    });
    var big_onoff=true;
    //最大化
    $('.chat_t_max').click(function(){
      popupW=500;
      popupH=400;
      if(big_onoff){
        $popup.css({'width':bodyW+'px','height':bodyH+'px','left':0,'top':0});
      }else{
        $popup.css({'width':popupW+'px','height':popupH+'px','left':left_+'px','top':top_+'px'});
      }
      big_onoff=!big_onoff;
    });
    //最小化
    $('.chat_t_min').click(function(){
      $popup.css('overflow','hidden')
      $popup.animate({'width':150+'px','height':50+'px','left':0+'px','bottom':0})
      popupW=150;popupH=50;
    });

    $('.chat_emit').click(function(){   //发送
      var val=$('.chat_area').val();
      var $list=$('<div class="chat_box_1">'+
                    '<p class="chat_list_p_1">'+
                      '<span class="chat_time">2051-12-6</span>'+
                      '<span class="chat_name">锤子</span>'+
                    '</p>'+
                    '<div class="chat_text_1">'+val+'</div>'+
                  '</div>'
                );
      $list.appendTo($box);
      $('.chat_area').val('').focus();
      $box.animate({
        scrollTop: $box[0].scrollHeight+18
      },300)
    });

    $(document).mousemove(function(e){//移动鼠标
      if(onOff){
        var e=e||window.event;
        var x=e.pageX;
        var y=e.pageY;
        moveX=dx+x-mx;
        moveY=dy+y-my;
        //拖动范围
        var maxX=bodyW-popupW;
        var maxY=bodyH-popupH;
        moveX=Math.min(Math.max(0,moveX),maxX);
        moveY=Math.min(Math.max(0,moveY),maxY);
        $popup.css({'left':moveX+'px','top':moveY+'px'});
        left_=moveX;top_=moveY;
      }
    })




  }
})()
