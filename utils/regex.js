/**
 * Common regex patterns for validation
 */

// Email validation
// Checks for a valid email format (username@domain.tld)
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Password strength
// At least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
export const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// URL validation
// Validates common URL formats
export const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

// Phone number - international format
// Matches formats like +123456789, +12 3456789, etc.
export const INTERNATIONAL_PHONE_REGEX = /^\+\d{1,4}[ -]?\d{1,14}$/;

// Phone number - US format
// Matches formats like (123) 456-7890, 123-456-7890, 1234567890
export const US_PHONE_REGEX = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;

// Alphanumeric with spaces
// Only letters, numbers and spaces
export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9\s]*$/;

// Username validation
// 3-16 characters, letters, numbers, underscores and hyphens
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,16}$/;

// Date in format YYYY-MM-DD
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Credit card number
// Matches major credit card formats, removing spaces and dashes
export const CREDIT_CARD_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

// IP address (IPv4)
export const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Postal code - US ZIP code
export const US_ZIP_REGEX = /^\d{5}(-\d{4})?$/;

// French postal code (5 digits)
export const FRENCH_POSTAL_REGEX = /^\d{5}$/;

// HTML tag
export const HTML_TAG_REGEX = /<\/?[\w\s="/.':;#-/?]+>/gi;

// Hexadecimal color
export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Time in 24-hour format (HH:MM)
export const TIME_24H_REGEX = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Time in 12-hour format with AM/PM
export const TIME_12H_REGEX = /^(0?[1-9]|1[0-2]):[0-5][0-9](\s?[AP]M)$/i;

// Slug (for URLs)
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ISBN-10 or ISBN-13
export const ISBN_REGEX = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

/**
 * Helper function to test if a string matches a regex pattern
 * @param {string} str - The string to test
 * @param {RegExp} regex - The regex pattern to test against
 * @returns {boolean} - True if the string matches the pattern
 */
export const testRegex = (str, regex) => {
    return regex.test(str);
};

export default {
    EMAIL_REGEX,
    STRONG_PASSWORD_REGEX,
    URL_REGEX,
    INTERNATIONAL_PHONE_REGEX,
    US_PHONE_REGEX,
    ALPHANUMERIC_REGEX,
    USERNAME_REGEX,
    DATE_REGEX,
    CREDIT_CARD_REGEX,
    IPV4_REGEX,
    US_ZIP_REGEX,
    FRENCH_POSTAL_REGEX,
    HTML_TAG_REGEX,
    HEX_COLOR_REGEX,
    TIME_24H_REGEX,
    TIME_12H_REGEX,
    SLUG_REGEX,
    ISBN_REGEX,
    testRegex
};
