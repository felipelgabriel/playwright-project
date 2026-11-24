module.exports = {
    default: {
        require: [
            'support/**/*.js',
            'step-definitions/**/*.js'
        ],
        format: [
            'progress'
        ],
        publishQuiet: true
    }
}