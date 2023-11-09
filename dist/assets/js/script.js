"use strict";

// loading
$(window).on("load", function () {
  $(".loading").delay(1500).fadeOut("slow"); //ローディング画面を1.5秒（1500ms）待機してからフェードアウト
  $(".loading__logo").delay(1200).fadeOut("slow"); //ロゴを1.2秒（1200ms）待機してからフェードアウト
});

jQuery(function ($) {
  //ナビパートグル
  $(".js-hamburger").on("click", function () {
    if ($(".js-hamburger").hasClass("is-open")) {
      $(".js-drawer-menu").fadeOut();
      $(this).removeClass("is-open");
    } else {
      $(".js-drawer-menu").fadeIn();
      $(this).addClass("is-open");
    }
  });
  $(".js-hamburger").on("click", function () {
    $("body").toggleClass("is-open");
  });
  $(".js-hamburger__link").on("click", function () {
    $("body").toggleClass("is-open");
    if ($(".js-hamburger").hasClass("is-open")) {
      $(".js-drawer-menu").fadeOut();
      $(this).removeClass("is-open");
    } else {
      $(".js-drawer-menu").fadeIn();
      $(this).addClass("is-open");
    }
  });
});

//swiper メインビュー
var swiper1 = new Swiper(".js-main-swiper", {
  loop: true,
  effect: "fade",
  speed: 2000,
  allowTouchMove: false,
  autoplay: {
    delay: 2000
  }
});

//swiper
var swiper = new Swiper(".js-campaign-swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: "auto",
  spaceBetween: 24,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".slider-button-next",
    prevEl: ".slider-button-prev"
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  breakpoints: {
    768: {
      spaceBetween: 40
    }
  }
});

//画像アニメーション
var box = $(".js-colorbox"),
  speed = 700;

//.colorboxの付いた全ての要素に対して下記の処理を行う
box.each(function () {
  $(this).append('<div class="color"></div>');
  var color = $(this).find($(".color")),
    image = $(this).find("img");
  var counter = 0;
  image.css("opacity", "0");
  color.css("width", "0%");
  //inviewを使って背景色が画面に現れたら処理をする
  color.on("inview", function () {
    if (counter == 0) {
      $(this).delay(200).animate({
        width: "100%"
      }, speed, function () {
        image.css("opacity", "1");
        $(this).css({
          left: "0",
          right: "auto"
        });
        $(this).animate({
          width: "0%"
        }, speed);
      });
      counter = 1;
    }
  });
});

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop(); //スクロール値を取得
  if (scroll >= 200) {
    //200pxスクロールしたら
    $("#page-top").removeClass("DownMove"); // DownMoveというクラス名を除去して
    $("#page-top").addClass("UpMove"); // UpMoveというクラス名を追加して出現
  } else {
    //それ以外は
    if ($("#page-top").hasClass("UpMove")) {
      //UpMoveというクラス名が既に付与されていたら
      $("#page-top").removeClass("UpMove"); //  UpMoveというクラス名を除去し
      $("#page-top").addClass("DownMove"); // DownMoveというクラス名を追加して非表示
    }
  }

  var wH = window.innerHeight; //画面の高さを取得
  var footerPos = $("#footer").offset().top; //footerの位置を取得
  if (scroll + wH >= footerPos + 10) {
    var pos = scroll + wH - footerPos + 10; //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
    $("#page-top").css("bottom", pos); //#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
  } else {
    //それ以外は
    if ($("#page-top").hasClass("UpMove")) {
      //UpMoveというクラス名がついていたら
      $("#page-top").css("bottom", "10px"); // 下から10pxの位置にページリンクを指定
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$("#page-top").click(function () {
  $("body,html").animate({
    scrollTop: 0 //ページトップまでスクロール
  }, 500); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});

//* --------------------------------------------
/* informationのタブメニュー
/* -------------------------------------------- */

var tabList = document.querySelectorAll(".js-tab");
// タブコンテンツ
var tabContent = document.querySelectorAll(".js-tab-content");

//DOMが読み込み終わったら
document.addEventListener('DOMContentLoaded', function () {
  // タブに対してクリックイベントを適用
  for (var i = 0; i < tabList.length; i++) {
    tabList[i].addEventListener('click', tabSwitch);
  }
  // タブをクリックすると実行する関数
  function tabSwitch() {
    // activeクラスを削除
    document.querySelectorAll('.active')[0].classList.remove('active');
    // クリックしたタブにactiveクラスを付与    
    this.classList.add('active');
    // showクラスを削除
    document.querySelectorAll('.show')[0].classList.remove('show');
    // タブを配列風オブジェクトとして定義
    var aryTabs = Array.prototype.slice.call(tabList);
    // クリックしたタブの配列番号を取得     
    var index = aryTabs.indexOf(this);
    // クリックしたタブと同じ配列番号のタブコンテンツにshowクラスを付与    
    tabContent[index].classList.add('show');
  }
  ;
});

/* --------------------------------------------
  /* サイドバーのアーカイブ部分
  /* -------------------------------------------- */
$(function () {
  $(".js-toggle-item:not(:first-of-type)").css("display", "none");
  $(".js-toggle-title").on("click", function () {
    $(".js-toggle-item").slideToggle();
    $(this).toggleClass("open", 300);
  });
});

/* --------------------------------------------
  /* faqページのアコーディオン
  /* -------------------------------------------- */
$(function () {
  //クリックで動く
  $('.js-faq-title').click(function () {
    $(this).toggleClass("is-active");
    $(this).next('').slideToggle();
  });
});

/* --------------------------------------------
  /* aboutページのモーダル
  /* -------------------------------------------- */

// aboutのモーダル
MicroModal.init({});

/* --------------------------------------------
  /* コンタクトページ　バリデーション
  /* -------------------------------------------- */
//送信ボタンを押した時のみバリデーションメッセージ表示
$(".form__btn").click(function () {
  $(".wpcf7-form-control-wrap").addClass("is-show");
  $(".js-errorMessage").addClass("is-show");
});