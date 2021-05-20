jQuery(document).ready(function ($) {
    $('.form__input').focus(function () {
        let inputAttr = $(this).attr('data-input'),
            inputText = $('.form__input-text[data-input=' + inputAttr + ']'),
            inputWrapper = $('.form__input-wrapper[data-input=' + inputAttr + ']');
        $(inputText).addClass('form__input-text_active');
        $(inputWrapper).addClass('form__input-wrapper_active');
    })
    $('.form__input').focusout(function () {
        let inputAttr = $(this).attr('data-input'),
            inputText = $('.form__input-text[data-input=' + inputAttr + ']'),
            inputWrapper = $('.form__input-wrapper[data-input=' + inputAttr + ']');
        if ($(this).val() === '') {
            $(inputText).removeClass('form__input-text_active');
            $(inputWrapper).removeClass('form__input-wrapper_active');
        } else {
            $(inputWrapper).removeClass('form__input-wrapper_active');
        }
    })
});