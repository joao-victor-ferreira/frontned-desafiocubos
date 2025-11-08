import React from 'react';
import { useToast } from './useToast';
import '../../assets/css/Global.css';

export const ToastContainer: React.FC = () => {
  const { mensagens } = useToast();

  return (
    <div>
      {mensagens.map(msg => (
        <div key={msg.id} className={`mensagem-feedback-flutuante ${msg.tipo}`}>
          <span className="mensagem-icone">{msg.tipo === 'sucesso' ? '✓' : '⚠'}</span>
          <p>{msg.texto}</p>
        </div>
      ))}
    </div>
  );
};
