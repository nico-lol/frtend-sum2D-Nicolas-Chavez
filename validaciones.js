
        document.addEventListener('DOMContentLoaded', function () {
            const clienteRadios = document.querySelectorAll('input[name="clienteTipo"]');
            const empresaFields = document.getElementById('empresaFields');
            const deviceType = document.getElementById('deviceType');
            const deviceOtherField = document.getElementById('deviceOtherField');
            const brandSelect = document.getElementById('brandSelect');
            const brandOtherField = document.getElementById('brandOtherField');
            const warrantyCheckbox = document.getElementById('hasWarranty');
            const warrantyDetailsField = document.getElementById('warrantyDetailsField');
            const modalidadRadios = document.querySelectorAll('input[name="modalidadEntrega"]');
            const direccionDomicilioField = document.getElementById('direccionDomicilioField');
            const direccionCompleta = document.querySelector('input[name="direccionCompleta"]');
            const previamenteIntentadoCheckbox = document.getElementById('previamenteIntentado');
            const antecedentesField = document.getElementById('antecedentesField');
            const antecedentesDetalle = document.getElementById('antecedentesDetalle');
            const descripcionDetallada = document.getElementById('descripcionDetallada');
            const detalleCount = document.getElementById('detalleCount');
            const antecedentesCount = document.getElementById('antecedentesCount');
            const contactoPreferenceCheckboxes = document.querySelectorAll('.contact-preference');
            const contactError = document.getElementById('contactError');
            const ingresoForm = document.getElementById('ingresoForm');

            function updateEmpresaFields() {
                const empresa = document.querySelector('input[name="clienteTipo"]:checked').value === 'Empresa';
                empresaFields.classList.toggle('hidden', !empresa);
            }

            function updateDeviceOther() {
                deviceOtherField.classList.toggle('hidden', deviceType.value !== 'Otro');
            }

            function updateBrandOther() {
                brandOtherField.classList.toggle('hidden', brandSelect.value !== 'Otra');
            }

            function updateWarrantyField() {
                warrantyDetailsField.classList.toggle('hidden', !warrantyCheckbox.checked);
                warrantyDetailsField.querySelector('input').required = warrantyCheckbox.checked;
            }

            function updateDeliveryFields() {
                const domicilio = document.querySelector('input[name="modalidadEntrega"]:checked')?.value === 'Domicilio';
                direccionDomicilioField.classList.toggle('hidden', !domicilio);
                direccionCompleta.required = domicilio;
            }

            function updateAntecedentesField() {
                antecedentesField.classList.toggle('hidden', !previamenteIntentadoCheckbox.checked);
                antecedentesDetalle.required = previamenteIntentadoCheckbox.checked;
            }

            function updateCharacterCount(element, counter) {
                counter.textContent = element.value.length;
            }

            function validateContactPreferences() {
                const checked = Array.from(contactoPreferenceCheckboxes).some(input => input.checked);
                contactError.classList.toggle('hidden', checked);
                return checked;
            }

            clienteRadios.forEach(radio => radio.addEventListener('change', updateEmpresaFields));
            deviceType.addEventListener('change', updateDeviceOther);
            brandSelect.addEventListener('change', updateBrandOther);
            warrantyCheckbox.addEventListener('change', updateWarrantyField);
            modalidadRadios.forEach(radio => radio.addEventListener('change', updateDeliveryFields));
            previamenteIntentadoCheckbox.addEventListener('change', updateAntecedentesField);
            contactoPreferenceCheckboxes.forEach(input => input.addEventListener('change', validateContactPreferences));
            descripcionDetallada.addEventListener('input', function () { updateCharacterCount(descripcionDetallada, detalleCount); });
            antecedentesDetalle.addEventListener('input', function () { updateCharacterCount(antecedentesDetalle, antecedentesCount); });

            ingresoForm.addEventListener('submit', function (event) {
                const contactValid = validateContactPreferences();
                if (!contactValid) {
                    event.preventDefault();
                    contactError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });

            ingresoForm.addEventListener('reset', function () {
                window.setTimeout(function () {
                    updateEmpresaFields();
                    updateDeviceOther();
                    updateBrandOther();
                    updateWarrantyField();
                    updateDeliveryFields();
                    updateAntecedentesField();
                    validateContactPreferences();
                }, 0);
            });

            updateEmpresaFields();
            updateDeviceOther();
            updateBrandOther();
            updateWarrantyField();
            updateDeliveryFields();
            updateAntecedentesField();
            updateCharacterCount(descripcionDetallada, detalleCount);
            updateCharacterCount(antecedentesDetalle, antecedentesCount);
        });