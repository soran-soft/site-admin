import React, { Component, PropTypes } from 'react';

export default class InputText extends Component {
    static propTypes = {
        asStyle: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        inline: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string,
        inputId: PropTypes.string.isRequired,
        handleChange: PropTypes.func.isRequired
    }

    render() {
        let { asStyle, name, placeholder, inline, title, type, inputId, handleChange } = this.props;
        let labelClass = '',
            textClass = 'form-text';

        if (!asStyle) {
            asStyle = '';
        }

        if (!name) {
            name = '';
        }

        if (!placeholder) {
            placeholder = '';
        }

        if (!type) {
            type = 'input';
        }

        if (inline) {
            if (inline === 'auto') {
                textClass += '-inline';
            } else if (/\d{2}/g.test(inline)) {
                labelClass += 'as-col-' + inline.charAt(0);
                textClass += '-inline as-col-' + inline.charAt(1);
            }
        }

        return (
            <div className={'as-form-group ' + asStyle}>
                {title && <label htmlFor={inputId} className={labelClass}>{title}</label>}

                {type === 'input' && <input type="text" id={inputId} name={name} className={textClass} placeholder={placeholder} onChange={handleChange} />}
                {type === 'textarea' && <textarea id={inputId} name={name} className={textClass} placeholder={placeholder} rows="10" onChange={handleChange}></textarea>}
            </div>
        );
    }
}
