"use client";
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
} from "antd";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface StudentType {
  id: number;
  name: string;
  birthDate: string;
  score: number;
}

export default function Home() {
  const [data, setData] = useState<StudentType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudents = (query = "") => {
    axios
      .get("http://localhost:4000/students", {
        params: {
          search: query,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        message.error("Lỗi khi lấy danh sách sinh viên");
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreateStudent = (values: any) => {
    axios
      .post(
        "http://localhost:4000/students",
        {
          name: values.name,
          birthDate: values.birthDate.format("YYYY/MM/DD"),
          score: values.score,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        message.success("Tạo sinh viên thành công");
        setModalVisible(false);
        form.resetFields();
        fetchStudents(searchQuery);
      })
      .catch(() => {
        message.error("Tạo sinh viên thất bại");
      });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    fetchStudents(value);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    { title: "Score", dataIndex: "score", key: "score" },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-between max-w-4xl">
        <Input.Search
          placeholder="Tìm kiếm sinh viên..."
          allowClear
          enterButton="Tìm"
          size="large"
          onSearch={handleSearch}
          style={{ maxWidth: 400 }}
        />
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Tạo sinh viên
        </Button>
      </div>

      <Table<StudentType>
        columns={columns}
        dataSource={data}
        rowKey="id"
        style={{ width: "100%", maxWidth: "1000px" }}
      />

      <Modal
        title="Tạo sinh viên mới"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateStudent}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="birthDate"
            rules={[{ required: true, message: "Chọn ngày sinh" }]}
          >
            <DatePicker format="YYYY/MM/DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Điểm"
            name="score"
            rules={[{ required: true, message: "Nhập điểm" }]}
          >
            <InputNumber min={0} max={10} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
