$(document).ready(function() {
    (function () {

        'use strict';

        /* Create User Object */
        var user = {
            name: "Empresa X Y Z",
            address: "Calle Río Lerma 4, Piso 6, Colonia Cuauhtémoc, CP 53000, Ciudad de México",
            telephone: "0445533678909"
        }

        /* Create Order Items Object */
        var order = [
            {
                desc: "ASUS ZenPad Z300M-A2-GR 16GB Negro, Gris - Tablet (Tableta de tamaño completo, IEEE 802.11n, Android, Pizarra, Android 6.0, Negro, Gris)",
                quantity: "2",
                price: "3380.95"
            },
            {
                desc: "Lenovo TAB3 Essential - ZA0R0029US 7\" Android Tablet",
                quantity: "1",
                price: "1495.31"
            },
            {
                desc: "Star Wars Figuras de Acción Star Wars Black Series, AT-AT Driver, 6\"",
                quantity: "1",
                price: "449.00"
            },
        ];

        /* Order Quantity */
        $('.oci-quantity-controller a').bind('click', function(e) {
            e.preventDefault();
        });

        /* User Data Modification */
        $('.ic-user .icu-info > div a').bind('click', function(e){
            e.preventDefault();

            $(this).toggleClass('active');

            var $span = $(this).siblings('span');
            var $input = $(this).siblings('input');

            if ($(this).hasClass('active'))  {
                $input.val($span.html());
            } else {
                $span.html($input.val());
                $('.scu-name').html($('.icu-name span').html());
                $('.scu-address').html($('.icu-address span').html());
                $('.scu-phone').html($('.icu-phone span').html());
            }

            $span.toggleClass('hidden');
            $input.toggleClass('active');

            CheckOrderButton();
        });

        /* Payment Method Select */
        $('.icp-payment-header').bind('click', function() {
            // Select the payment and if it's credit card open form
            if ($(this).hasClass('active')) return;
            $('.icp-payment-header').removeClass('active');
            $('.cc-payment-data').slideUp();
            $(this).addClass('active');
            if ($(this).hasClass('icph-cc')) {
                $('.cc-payment-data').slideDown();
            }

            // Copy Payment Method to Summary
            $(".sc-payment .icp-icon").attr('class', $(this).children('.icp-icon').attr('class'));
            $(".sc-payment .scp-text").html($(this).attr('data-payment'));

            // Enable Order Btn
            CheckOrderButton();
        });

        /* Credit Card Form Validators */
        $('.ccf-name').bind('keyup', function(){
            CheckOrderButton();
        });
        $('.ccf-number').bind('keyup', function() {
            // Checks number for Card Brand
            var ccNumber = $(this).val().toString();
            if (ccNumber.length > 16 ) $(this).val(ccNumber.substr(0,16));
            if (ccNumber.length > 0) {
                $('.icph-cc .icp-icon').attr('class', 'icp-icon');
                $('.sc-payment .icp-icon').attr('class', 'icp-icon icn-creditcard');
                var ccBrand = "icn-creditcard",
                    firstDigit = ccNumber.substr(0,1);
                if (firstDigit === "3") {
                    ccBrand = "icn-amex";
                } else if (firstDigit === "4") {
                    ccBrand = "icn-visa";
                } else if (firstDigit === "5"){
                    ccBrand = "icn-mastercard";
                }
                $('.icph-cc .icp-icon').addClass(ccBrand);
                $('.sc-payment .icp-icon').addClass(ccBrand);
            } else {
                $('.icph-cc .icp-icon').attr('class', 'icp-icon icn-creditcard');
                $('.sc-payment .icp-icon').attr('class', 'icp-icon icn-creditcard');
            }
            CheckOrderButton();
        });
        $('.cc-date-selects select').bind('change', function(){
            CheckOrderButton();
        });
        $('.ccf-cvc').bind('keyup', function() {
            var ccCVC = $(this).val();
            if (ccCVC.length > 4 ) $(this).val(ccCVC.toString().substr(0,4));
            CheckOrderButton();
        });

        /* Place Order Button */
        $('.sc-place-order-btn').bind('click', function(e) {
            e.preventDefault();
        });

        function CheckOrderButton() {
            // Check Complete User Info
            if (
                $('.icu-info > div a').hasClass('active') ||
                $('.icu-info > div span').html().length < 5
            ) {
                $('.sc-place-order-btn a').addClass('disabled');
                return;
            }

            // Check for Payment Method
            if ($('.icp-payment-header').hasClass('active')) {
                if ($('.icph-cc').hasClass('active')) {
                    if (
                        $('.ccf-name').val().length < 5 ||
                        $('.ccf-number').val().length < 16 ||
                        $('.cc-month select').val() === "00" ||
                        $('.cc-year select').val() === "00" ||
                        $('.ccf-cvc').val().length < 3
                    ) {
                        $('.sc-place-order-btn a').addClass('disabled');
                    } else {
                        $('.sc-place-order-btn a').removeClass('disabled');
                    }
                } else {
                    $('.sc-place-order-btn a').removeClass('disabled');
                }
            }
        }


    })();
});
