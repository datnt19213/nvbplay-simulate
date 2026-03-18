import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { useId } from 'react';
import { cn } from '@/lib/utils';
import { InputProps } from '@/types';

interface InputLabelProps extends InputProps {
   label?: string;
   rightLabel?: React.ReactNode;
   sizes?: 'small' | 'medium';
   requiredLabel?: boolean;
}

const InputLabel = ({
   label,
   required = false,
   requiredLabel = false,
   rightLabel,
   sizes = 'medium',
   className,
   id,
   ...props
}: InputLabelProps) => {
   const generatedId = useId();
   const inputId = id || generatedId;

   return (
      <div className="block w-full">
         {label && (
            <span className="flex justify-between items-center text-neutral-800 mb-2">
               <Label
                  className={cn('text-neutral-900 dark:text-neutral-300', {
                     'text-sm font-medium': sizes === 'small',
                     'text-base': sizes === 'medium',
                  })}
                  htmlFor={inputId}
               >
                  {label} {required && <span className="text-red-500">*</span>}
                  {!required && requiredLabel && (
                     <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                        (optional)
                     </span>
                  )}
               </Label>
               {rightLabel}
            </span>
         )}

         <Input
            id={inputId}
            className={cn(
               'block w-full border-none truncate bg-[#F5F5FA] dark:bg-neutral-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 rounded text-sm font-normal min-h-11 h-10 px-4 py-3 mt-1',
               className,
            )}
            {...props}
         />
      </div>
   );
};

export default InputLabel;
