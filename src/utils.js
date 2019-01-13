export const numberWithUnit = (number) => {
    if (number >= 1000 && number < 1000000) {
        return parseInt(number / 1000) + 'K';
    } else if (number >= 1000000) {
        return parseInt(number / 1000000) + 'M';
    }

    return number;
}

export const validateEmailAddress = (emailAddress) => /\S+@\S+\.\S+/.test(emailAddress);

export const event = (name, params) => {
    if (process.env.NODE_ENV === 'production') {
        try {
            window.gtag('event', name, params);
        } catch (err) {
            console.error(err.message);
        }
    }
}

export const connectionFailedEvent = (statusCode, errorMessage) => {
    event('exception', { description: `connect failed with status ${statusCode}, error- ${errorMessage}`, fatal: true });
}

export const uncaughtException = (message, stack) => {
    event('exception', { description: `an error has occured: ${message}, error: ${stack}`, fatal: true });
}