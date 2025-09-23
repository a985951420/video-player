import React, { useState, useEffect, useRef } from "react";
import "./EditCountModal.css";

const EditCountModal = ({ visible, onClose, onConfirm, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || 0);
  const inputRef = useRef(null);

  // 保证每次弹窗打开时都同步 defaultValue 并选中输入框内容
  useEffect(() => {
    setValue(defaultValue || 0);
    if (visible && inputRef.current) {
      // 使用setTimeout确保DOM已经渲染完成
      setTimeout(() => {
        inputRef.current.select();
      }, 100);
    }
  }, [defaultValue, visible]);

  if (!visible) return null;

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="edit-modal-title">修改次数</h3>
        <input
          ref={inputRef}
          type="number"
          min={0}
          className="edit-modal-input"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ""))}
        />
        <div className="edit-modal-actions">
          <button className="edit-modal-btn" onClick={onClose}>
            取消
          </button>
          <button
            className="edit-modal-btn confirm"
            onClick={() => onConfirm(parseInt(value))}
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCountModal;