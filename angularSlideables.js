angular.module('angularSlideables', [])
.directive('slideable', function () {
    return {
        restrict:'CA',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');
           
            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            element.bind('click', function() {    
                var target, content;
                if (!target && attrs.slideToggle) target = document.querySelector(attrs.slideToggle);
                if(target) {

                    if(target.style.height === '0px') {
                      attrs.expanded = false;
                    } else {
                      attrs.expanded = true;
                    }
                    
                    if (!content) content = target.querySelector('.slideable_content');
                    
                    if(!attrs.expanded) {
                        content.style.border = '1px solid rgba(0,0,0,0)';
                        var y = content.clientHeight;
                        content.style.border = 0;
                        target.style.height = 'auto';
                    } else {
                        target.style.height = '0px';
                    }

                    attrs.expanded = !attrs.expanded;
                }
            });
        }
    }
});
