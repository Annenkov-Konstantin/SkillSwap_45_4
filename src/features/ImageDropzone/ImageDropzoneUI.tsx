import { useDropzone } from "react-dropzone";
import styles from './ImageDropzone.module.scss';
import { useEffect, useState, type FC } from "react";
import type { TImageDropzoneProps } from "./type";

export const ImageDropzone: FC<TImageDropzoneProps> = ({ handleDelete }) => {

  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))]);
    }
  });

  const handleRemoveFile = (targetFile: File & { preview: string }) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== targetFile));
    URL.revokeObjectURL(targetFile.preview);
    handleDelete?.(targetFile);
  };

  const thumbs = files.map(file => (
    <div className={styles.thumb} key={file.name} onClick={(e) => e.stopPropagation()}>
      <div className={styles.thumbInner}>
        <img
          src={file.preview}
          className={styles.img}
          onLoad={() => { URL.revokeObjectURL(file.preview); }}
        />
        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            handleRemoveFile(file);
          }}
          className={styles.delete_button}
        >
          <svg className={styles.delete_button_icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path fill="#253017" d="M14.791 2C19.841 2 22 4.158 22 9.209v5.582C22 19.841 19.842 22 14.791 22H9.209C4.159 22 2 19.842 2 14.791V9.209C2 4.159 4.158 2 9.209 2h5.582ZM8 11.25c-.41 0-.75.34-.75.75s.34.75.75.75h8c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H8Z"/>
          </svg>
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className={styles.container} {...getRootProps()}>
      <input {...getInputProps()} />
      {files.length === 0 ? (
        <>
          <p className={styles.tip}>Перетащите или выберите изображения навыка</p>
          <div className={styles.input_container}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path fill="#508826" d="M9.21 10.837A2.557 2.557 0 0 1 6.65 8.28 2.557 2.557 0 0 1 9.21 5.721a2.557 2.557 0 0 1 2.558 2.558 2.557 2.557 0 0 1-2.558 2.558Zm0-3.72a1.163 1.163 0 1 0 0 2.326 1.163 1.163 0 0 0 0-2.327Z"/>
              <path fill="#508826" d="M14.79 22H9.21C4.157 22 2 19.842 2 14.79V9.21C2 4.157 4.158 2 9.21 2h3.72c.382 0 .698.316.698.698a.703.703 0 0 1-.698.697H9.21c-4.29 0-5.815 1.526-5.815 5.814v5.582c0 4.288 1.526 5.814 5.814 5.814h5.582c4.288 0 5.814-1.526 5.814-5.814v-4.652c0-.38.316-.697.697-.697.382 0 .698.316.698.697v4.652C22 19.84 19.842 22 14.79 22Z"/>
              <path fill="#508826" d="M20.605 6.186h-5.117a.703.703 0 0 1-.697-.698c0-.381.316-.697.697-.697h5.117c.38 0 .697.316.697.697a.703.703 0 0 1-.697.698Z"/>
              <path fill="#508826" d="M18.046 8.744a.703.703 0 0 1-.697-.697V2.93c0-.381.316-.697.697-.697.382 0 .698.316.698.697v5.117a.703.703 0 0 1-.698.697ZM3.32 19.163a.699.699 0 0 1-.39-1.275l4.586-3.079c1.005-.67 2.39-.595 3.303.177l.306.27c.466.4 1.256.4 1.712 0l3.87-3.321c.995-.847 2.54-.847 3.535 0l1.516 1.302a.703.703 0 0 1 .074.986.703.703 0 0 1-.986.075l-1.516-1.303c-.465-.4-1.256-.4-1.711 0l-3.87 3.321c-.986.847-2.54.847-3.535 0l-.307-.27c-.428-.362-1.135-.4-1.61-.074l-4.576 3.08a.815.815 0 0 1-.4.11Z"/>
            </svg>
            <p>Выбрать изображения</p>
          </div>
        </>
      ) : (
        <aside className={styles.thumbsContainer}>
          {thumbs}
        </aside>
      )}
    </section>
  );
};
