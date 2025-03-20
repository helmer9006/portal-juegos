import { HiSearch } from "react-icons/hi";
import classNames from "classnames";
import { HiCreditCard } from "react-icons/hi2";
import { LiaPercentSolid } from "react-icons/lia";

interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "search" | "number" | "tel";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  searchicon?: boolean;
  cardIcon?: boolean;
  percentage?: boolean;
  customIcon?: JSX.Element;
  required?: boolean;
  showRequired?: boolean;
  showLength?: boolean;
  count?: number;
  maxLength?: number;
  disabled?: boolean;
  inputHeight?: string;
  colorLabel?: string;
  overflowLabel?: boolean;
}

const MyTextInput = ({
  label,
  searchicon = false,
  cardIcon = false,
  percentage = false,
  customIcon,
  error,
  touched,
  ...props
}: Props) => {
  const isError = touched && error;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={props.name}
          className={classNames(
            `font-bold ${
              props?.colorLabel || "text-[#40444D]"
            } inline w-auto mb-2 text-sm`,
            isError ? "text-colmena-error--200" : "",
            props?.overflowLabel ? "overflow-anywhere" : "truncate",
            props.required &&
              !props.showRequired &&
              "after:content-['*'] after:ml-0.5 after:text-error-200"
          )}
        >
          {label}
        </label>
      )}

      <div className="inline-flex w-full flex-col relative items-center">
        {searchicon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <HiSearch className="h-5 w-5 text-[#565B66]" />
          </div>
        )}

        <div className="flex w-full relative">
          {cardIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <HiCreditCard className="h-5 w-5 text-[#565B66]" />
            </div>
          )}

          {customIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              {customIcon}
            </div>
          )}

          <input
            type={props.type || "text"}
            id={props.name}
            className={`text-[#6B7280] border border-[#E9EAEC] px-4 py-2 ${
              searchicon || cardIcon || customIcon ? "pl-8" : ""
            } 
              rounded-lg focus:border-primary-colmena focus:border-0 focus:ring-primary-colmena w-full h-[46px] 
              ${props.inputHeight}
              disabled:cursor-not-allowed disabled:text-[#D1D3D8]
              ${
                isError
                  ? "bg-[#FEF1F1] focus:ring-red-500 border-red-500 text-red-500 placeholder:text-colmena-error--200"
                  : ""
              }
            `}
            {...props}
          />

          {percentage && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <LiaPercentSolid className="h-5 w-5 text-[#6B7280]" />
            </div>
          )}

          {props.showLength && (
            <p className="text-right text-greyscale-100 ml-[-130px] mt-[13px] text-normal text-sm mb-2">
              Caracteres {props.count}/{props.maxLength ?? 400}
            </p>
          )}
        </div>

        {isError && (
          <span className="text-colmena-error--200 mt-1 text-xsm self-start">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default MyTextInput;
