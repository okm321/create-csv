import { useState, type FC } from 'react';
import { Select, Option } from '@material-tailwind/react';
import { Wave } from 'components/Wave';

const CsvDatType = {
  FixedString: 1,
  UniqueString: 2,
  LastName: 3,
  FirstName: 4,
  Email: 5,
  PhoneNumber: 6,
} as const;

const CsvDataMapping = [
  {
    id: CsvDatType.FixedString,
    text: '固定文字列',
  },
  {
    id: CsvDatType.UniqueString,
    text: 'ユニーク文字列',
  },
  {
    id: CsvDatType.LastName,
    text: '名前-姓',
  },
  {
    id: CsvDatType.FirstName,
    text: '名前-名',
  },
  {
    id: CsvDatType.Email,
    text: 'メールアドレス',
  },
  {
    id: CsvDatType.PhoneNumber,
    text: '電話番号',
  },
] as const;

type CsvDataType = (typeof CsvDatType)[keyof typeof CsvDatType];

type InputItem = {
  headerName: string;
  value: any;
  type: CsvDataType;
};

const App: FC = () => {
  const [isGroupHeader, setIsGroupHeader] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [secondHeaderText, setSecondHeaderText] = useState('');
  const [headerAry, setHeaderAry] = useState<InputItem[]>([]);

  const createHeader = () => {
    if (isGroupHeader) {
      const headerAry = secondHeaderText.split(',');
      setHeaderAry(() => {
        return headerAry.map((header) => {
          return {
            headerName: header,
            value: '',
            type: 1,
          };
        });
      });
    }
    const headerAry = headerText.split(',');
    setHeaderAry(() => {
      return headerAry.map((header) => {
        return {
          headerName: header,
          value: '',
          type: 1,
        };
      });
    });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200">
            CSVメーカー
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            csvがランダムで生成されるよー
          </p>

          <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={isGroupHeader}
                onChange={() => {
                  setIsGroupHeader(!isGroupHeader);
                }}
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
              >
                ヘッダーが複数行あります？
              </label>
            </div>
            <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/[.2]">
              <label className="flex-[0_0_auto]" htmlFor="firstHeader">
                <div className="p-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                  ヘッダー1行目
                </div>
              </label>
              <div className="flex-[1_0_0%]">
                <input
                  type="text"
                  id="firstHeader"
                  className="p-3 block w-full border-transparent rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-400"
                  value={headerText}
                  onChange={(event) => {
                    setHeaderText(event.target.value);
                  }}
                  placeholder=",基本情報-求職者サイト表示項目,,,,,,基本情報-管理用項目,,,,,"
                />
              </div>
            </div>
            {isGroupHeader && (
              <div className="relative z-10 flex space-x-3 mt-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                <label className="flex-[0_0_auto]" htmlFor="secondHeader">
                  <div className="p-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    ヘッダー2行目
                  </div>
                </label>
                <div className="flex-[1_0_0%]">
                  <input
                    type="text"
                    value={secondHeaderText}
                    onChange={(event) => {
                      setSecondHeaderText(event.target.value);
                    }}
                    id="secondHeader"
                    className="p-3 block w-full border-transparent rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-400"
                    placeholder="スタッフID,名前-姓,名前-名,フリガナ-セイ,フリガナ-メイ,電話番号,メールアドレス,支社名,登録日,スタッフ向け同意"
                  />
                </div>
              </div>
            )}
            <button
              onClick={createHeader}
              className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm sm:p-4 dark:focus:ring-offset-gray-800"
            >
              Party Time
            </button>
            <Wave />
          </div>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto my-5">
        {headerAry.map((header, index) => (
          <div className="flex border border-black" key={index}>
            <div className="border-r border-black p-5 w-1/3">
              {header.headerName}
            </div>
            <div className="p-5">
              <div className="w-72">
                <Select label="Select Version">
                  {CsvDataMapping.map((csvData) => (
                    <Option key={csvData.id} value={String(csvData.id)}>
                      {csvData.text}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
