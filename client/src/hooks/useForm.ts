import {useState} from 'react';
interface UseFormProps<T extends object> {
  initialValue: T;
}

const useForm = <T extends object>({initialValue}: UseFormProps<T>) => {
  const [form, setForm] = useState(initialValue);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(() => {
    return Object.keys(initialValue).reduce((acc, key) => {
      acc[key as keyof T] = false;
      return acc;
    }, {} as Record<keyof T, boolean>);
  });

  const handleChangeText = (name: keyof T, text: string) => {
    setForm(prev => ({
      ...prev,
      [name]: text,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const getTextInputProps = (name: keyof T) => {
    const value = form[name];
    const onChangeText = (text: string) => handleChangeText(name, text);
    const onBlur = () => handleBlur(name);

    return {
      value,
      onChangeText,
      onBlur,
    };
  };

  return {form, touched, getTextInputProps};
};
export default useForm;
