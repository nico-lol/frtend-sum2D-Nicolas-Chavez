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

    const nombreField = ingresoForm.querySelector('[name="nombre"]');
    const dniField = ingresoForm.querySelector('[name="dni"]');
    const emailField = ingresoForm.querySelector('[name="email"]');
    const emailConfirmField = ingresoForm.querySelector('[name="emailConfirm"]');
    const telefonoField = ingresoForm.querySelector('[name="telefono"]');
    const empresaNombreField = ingresoForm.querySelector('[name="empresaNombre"]');
    const empresaCuitField = ingresoForm.querySelector('[name="empresaCuit"]');
    const regionField = ingresoForm.querySelector('[name="region"]');
    const localidadField = ingresoForm.querySelector('[name="localidad"]');

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

    function setValidity(field, isValid, message) {
        field.setCustomValidity(isValid ? '' : message);
        if (!isValid) {
            field.reportValidity();
        }
        return isValid;
    }

    function validateSectionA() {
        const nameValid = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{5,80}$/.test(nombreField.value.trim());
        if (!setValidity(nombreField, nameValid, 'Nombre solo letras y espacios, 5-80 caracteres.')) return false;

        const dniValid = /^\d{7,8}$/.test(dniField.value.trim());
        if (!setValidity(dniField, dniValid, 'DNI debe tener solo 7 u 8 dígitos.')) return false;

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
        if (!setValidity(emailField, emailValid, 'Ingrese un correo válido con @ y dominio.')) return false;

        const emailConfirmExact = emailConfirmField.value.trim() === emailField.value.trim();
        if (!setValidity(emailConfirmField, emailConfirmExact, 'El correo de confirmación debe coincidir exactamente.')) return false;

        const telefonoValue = telefonoField.value.trim();
        const telefonoPatternValid = /^[\d+\-\s]+$/.test(telefonoValue);
        const telefonoDigitsCount = telefonoValue.replace(/\D/g, '').length;
        const telefonoValid = telefonoPatternValid && telefonoDigitsCount >= 8;
        if (!setValidity(telefonoField, telefonoValid, 'Teléfono solo dígitos, +, guiones y espacios; mínimo 8 dígitos.')) return false;

        const regionValid = regionField.value.trim() !== '';
        if (!setValidity(regionField, regionValid, 'Debe seleccionar una región.')) return false;

        const localidadValid = localidadField.value.trim().length >= 2;
        if (!setValidity(localidadField, localidadValid, 'Localidad debe tener al menos 2 caracteres.')) return false;

        const clienteTipoValue = document.querySelector('input[name="clienteTipo"]:checked')?.value;
        if (!clienteTipoValue) {
            alert('Seleccione una opción de tipo de cliente.');
            return false;
        }

        if (clienteTipoValue === 'Empresa') {
            const empresaNombreValid = empresaNombreField.value.trim().length > 0;
            if (!setValidity(empresaNombreField, empresaNombreValid, 'Nombre de empresa no puede quedar vacío.')) return false;

            const cuitValue = empresaCuitField.value.trim();
            const cuitValid = /^(\d{2}-\d{8}-\d|\d{11})$/.test(cuitValue);
            if (!setValidity(empresaCuitField, cuitValid, 'CUIT debe tener formato ##-########-# o 11 dígitos seguidos.')) return false;
        } else {
            empresaNombreField.setCustomValidity('');
            empresaCuitField.setCustomValidity('');
        }

        return true;
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
        const sectionAValid = validateSectionA();

        if (!contactValid || !sectionAValid) {
            event.preventDefault();
            if (!contactValid) {
                contactError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
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