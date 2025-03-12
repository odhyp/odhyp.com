import socket
import subprocess
import qrcode
import qrcode.constants


def create_qr_code(url: str):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
    )
    qr.add_data(url)
    qr.make(fit=True)
    qr.print_ascii()


def main():
    try:
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
        base_url = f"http://{local_ip}"
        port = "1313"
        site_url = f"{base_url}:{port}"

        create_qr_code(site_url)
        subprocess.run(
            [
                "hugo",
                "server",
                "--bind",
                "0.0.0.0",
                "--baseURL",
                base_url,
                "--port",
                port,
            ],
            check=True,
        )

    except KeyboardInterrupt:
        pass

    except Exception as e:
        print(e)


if __name__ == "__main__":
    main()
