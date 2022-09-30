
export default function Validation(form) {
    const newErrors = {}

    if (form.question == '') newErrors.question = '* Please fill the question';

    if (form.answer == '') newErrors.answer = '* Please fill the answer';

    if (form.skill == '') newErrors.skill = '* Please select skill';

    if (form.level == '') newErrors.level = '* Please select level';

    if (form.module == '') newErrors.module = '* Please select module';
   
    return newErrors
}