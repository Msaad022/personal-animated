$(function () {

    let mq = window.matchMedia('(max-width: 2440px)')
    let row = $('.row');

    let imgParent = row.find('.parent-img');
    let imgParentoffset = imgParent.offset().top;
    let startAnimate = 30
    let img = imgParent.find('.img').outerHeight(true) + startAnimate;
    let headerText = row.find('.header-text').outerHeight(true);

    let ulH = row.find("> ul").outerHeight();

    let lis = row.find('> ul > li');
    let liLength = (row.find('> ul > li').length) - 1;

    let li = lis.eq(0)
    let liH = li.outerHeight(true);
    let getGap = (ulH - (liH * (liLength + 1))) / liLength

    let inc
    let oneOnly = 1;

    var handleMatchMedia = function (md) {
        if (md.matches) {
            if (row.length) {
                if (oneOnly == 1) {
                    $('body').get(0).style.setProperty('--h-person-js', `${liH + headerText}px`);
                    $('body').get(0).style.setProperty('--mt-imgH-js', `${img}px`);
                    oneOnly++;
                }

                $(window).scroll(function () {

                    let scrollTop = $(window).scrollTop();

                    if (scrollTop >= imgParentoffset) {

                        let eqThis = ((scrollTop + img) - (imgParentoffset + img)) / (liH + getGap)
                        eqThis = parseInt(eqThis);

                        if (inc != eqThis && eqThis <= liLength) {
                            lis.removeClass('eqactive');
                            let col = lis.eq(eqThis);
                            col.addClass('eqactive');
                            inc = eqThis
                        }
                    }
                });


            }
        }
    };

    handleMatchMedia(mq);

    mq.addEventListener("change", () => {
        handleMatchMedia()
    });
});
