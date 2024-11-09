// Assuming `generateCV` is already defined or imported in this file
declare function generateCV(): void;

$(document).ready(() => {
    ($('.repeater') as any).repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function() {
            $(this).slideDown();
        },
        hide: function(deleteElement: () => void) {
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    });
});
