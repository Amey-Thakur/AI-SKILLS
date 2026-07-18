---
name: network-debugging
description: Diagnose failing or slow network calls by inspecting the actual bytes on the wire with curl, tcpdump, and TLS handshake analysis. Use when a request fails, hangs, or returns the wrong thing and you cannot tell whether the client, the network, or the server is at fault.
---

# Network debugging

"It works on my machine" is usually a network statement: a name resolves
differently, a proxy rewrites a header, a certificate expired an hour ago. The
application log shows only one end's version of events. To find the truth you
have to look at the connection itself, from DNS through the TLS handshake to
the response bytes.

## Method

1. **Make curl show every layer with `-v`.** `curl -v https://host/path`
   prints DNS resolution, the TCP connect, the full TLS handshake, and every
   request and response header. Add `--resolve host:443:1.2.3.4` to bypass DNS
   and test one specific server, or `-w '%{time_connect} %{time_starttls}
   %{time_total}\n'` to see where the milliseconds go.
2. **Split the failure into layers and test bottom up.** `dig host` for DNS,
   `nc -zv host 443` or `telnet host 443` for TCP reachability, then curl for
   HTTP. A hang at connect is a firewall or routing problem; a reset after
   connect is the server refusing; a 200 with wrong body is application logic.
3. **Capture the packets when curl is not enough.** `tcpdump -i any -n -w
   cap.pcap host 1.2.3.4 and port 443` records the exchange; open it in
   Wireshark. Look for SYN with no SYN-ACK (blocked), repeated retransmissions
   (loss), or a RST (one side aborting). The packet trace does not lie about
   who sent what.
4. **Read TLS handshake failures by their stage.** `curl -v` prints where it
   broke: `SSL certificate problem` is trust or expiry, `handshake failure`
   is a cipher or TLS-version mismatch, `unknown ca` is a missing
   intermediate. Confirm with `openssl s_client -connect host:443
   -servername host`, which dumps the presented chain and the negotiated
   protocol.
5. **Check SNI and the certificate the server actually serves.** On shared
   hosts the wrong virtual host answers when SNI is missing or mismatched.
   `openssl s_client -servername host -connect ip:443` shows the CN and SANs;
   if they do not include the hostname you asked for, name resolution or the
   SNI value is the bug, not the certificate.
6. **Isolate proxies and middleboxes explicitly.** Compare a direct call with
   one through the proxy by setting or clearing `HTTPS_PROXY`. A body that
   changes, a header that vanishes, or TLS that only fails through the proxy
   names the middlebox as the culprit rather than either endpoint.

## Checks

- Can you state which layer fails: DNS, TCP, TLS, or HTTP?
- Does `openssl s_client` show a chain whose SANs include the hostname?
- Does a packet capture show the server responding at all, or only silence?

## Boundaries

This covers one client talking to one endpoint. Systemic latency across many
services belongs to distributed tracing, and application-level bugs behind a
correct 200 response belong to ordinary debugging. Capturing traffic you do
not own or operate is a legal and privacy line, not a technical one.
