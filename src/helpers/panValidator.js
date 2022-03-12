export function panValidator(pannumber) {
    const re =/([A-Z]){5}([0-9]){4}([A-Z]){1}$/
    if (!pannumber) return "Email can't be empty."
    if (!re.test(pannumber)) return 'Ooops! We need a valid email address.'
    return ''
  }