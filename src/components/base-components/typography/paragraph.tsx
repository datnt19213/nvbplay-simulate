import { cn } from '@/lib/utils';

type ParagraphProps = {
   as?: 'p' | 'b' | 'i';
   size?: 'xl' | 'lg' | 'md' | 'sm';
   children: React.ReactNode;
   className?: string;
};

const Paragraph = ({
   as: Component = 'p',
   className,
   children,
   size = 'sm',
   ...restProps
}: ParagraphProps) => {
   return (
      <Component
         {...restProps}
         className={cn(
            'mt-2 md:mt-3 font-normal block text-neutral-500 dark:text-neutral-400',
            size === 'xl' && 'text-xl md:text-3xl',
            size === 'lg' && 'text-lg md:text-2xl',
            size === 'md' && 'text-base sm:text-xl',
            size === 'sm' && 'text-sm md:text-base',
            className,
         )}
      >
         {children}
      </Component>
   );
};

export default Paragraph;
