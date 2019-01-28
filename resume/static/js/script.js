// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}

function doEdit() {
    $(".left-label").attr('contenteditable', 'true');
    $(".label-value").attr('contenteditable', 'true');
    $(".info-title").attr('contenteditable', 'true');
    $("h3").attr('contenteditable', 'true');
    $("p").attr('contenteditable', 'true');
    $(".right-paragraph p").attr('contenteditable', 'true');
    $("#username").attr('contenteditable', 'true');
    $("#persona-tag").attr('contenteditable', 'true');

    // $("*[contenteditable]").each(function(index,element){
    //     var vmodel = $(this).attr("vmodel")
    //     $(this).after("<input class='displayNone' v-model='"+vmodel+"'>")
    // });
    // $('*[contenteditable]').on('DOMNodeInserted', function () {
    //     var txt = $(this).text();
    // })    
    
    $(".info-unit ul li").append('<span class="item-remove"><i class="iconfont icon-delete"></i></span>');

    $(".info-unit").filter(function (index) {
        return ($(this).children('ul').length);
    }).children("h2").append('<span class="item-add"><i class="iconfont icon-playlistadd"></i></span>');

    $(".info-unit h2").append('<span class="unit-remove"><i class="iconfont icon-delete"></i></span>');

    var portrait_modal = $('[data-remodal-id=portrait-modal]').remodal();
    $(".portrait").click(function (event) {
        portrait_modal.open();
    });
    $('[data-remodal-id=portrait-modal] button').click(function (event) {
        $(".portrait").css('background-image', 'url("{0}")'.format($("#avatar-url").val()));
    });
    var weixin_modal = $('[data-remodal-id=weixin-modal]').remodal();
    $(".weixin").click(function (event) {
        weixin_modal.open();
    });
    $('[data-remodal-id=weixin-modal] button').click(function (event) {
        $(".weixin img").attr('src', $("#weixin-url").val());
    });

    $('.info-header').hover(function () {
        /* Stuff to do when the mouse enters the element */
        $(this).children('.unit-remove').css('visibility', 'visible');
        $(this).children('.item-add').css('visibility', 'visible');

    }, function () {
        /* Stuff to do when the mouse leaves the element */
        $(this).children('.unit-remove').css('visibility', 'hidden');
        $(this).children('.item-add').css('visibility', 'hidden');
    });

    $('.info-unit ul li').hover(function () {
        /* Stuff to do when the mouse enters the element */
        $(this).children('.item-remove').css('visibility', 'visible');

    }, function () {
        /* Stuff to do when the mouse leaves the element */
        $(this).children('.item-remove').css('visibility', 'hidden');
    });

    $('.unit-remove').click(function (event) {
        $(this).closest(".info-unit").remove();
    });

    $('.item-remove').click(function (event) {
        $(this).closest("li").remove();
    });

    $('.item-add').click(function (event) {
        var unit = $(this).closest(".info-unit");
        if (unit.children('ul')) {
            var list = unit.children('ul');
            var clone = list.children('li:first-child').clone(true);
            list.append(clone);
        }

    });
    $("progress").click(function (event) {
        $(this).attr("value", event.offsetX / $(this).width() / 0.8 * $(this).attr("max"));
    });
    // $("*").removeAttr('contenteditable');


    //显示模板下载按钮，json下载按钮

}

Vue.component('input-h1', {
    props: ['value'], //使用v-model的表单组件时，父组件通过value来进行传值 
    template: '<input type="text" :value="value" @input="updateValue">',
    methods: {
        updateValue: function (event) {
            this.$emit('input', event.target.value);
        }
    }
})
Vue.component('textarea-h1', {
    props: {
        value: String,
        postTitle: String
    },
    template: '<textarea @input="updateValue">{{value}} -- {{postTitle}}</textarea>',
    methods: {
        updateValue: function (event) {
            this.$emit('input', event.target.value);
        }
    }
})